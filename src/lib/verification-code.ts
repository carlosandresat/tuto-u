import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";

/**
 * No "use server" aquí — src/lib/ nunca la lleva (ver CLAUDE.md). Cada export
 * de un módulo con esa directiva queda expuesto como endpoint HTTP público.
 */

export const VERIFICATION_CODE_TTL_MS = 15 * 60 * 1000;
export const VERIFICATION_MAX_ATTEMPTS = 5;
export const VERIFICATION_RESEND_COOLDOWN_MS = 60 * 1000;
export const VERIFICATION_MAX_SENDS_PER_WINDOW = 10;
export const VERIFICATION_SEND_WINDOW_MS = 60 * 60 * 1000;

/**
 * `randomInt` de node:crypto ya hace rechazo de sesgo internamente. NUNCA usar
 * Math.random(): en V8 es un xorshift128+ sembrado, predecible a partir de un
 * puñado de códigos observados — inaceptable para un espacio de 10^6.
 */
export const generateSixDigitCode = (): string =>
  randomInt(0, 1_000_000).toString().padStart(6, "0");

export type IssueResult =
  | { ok: true; code: string; expires: Date }
  | { ok: false; reason: "cooldown"; retryAfterSeconds: number }
  | { ok: false; reason: "send_limit" };

/**
 * Emite (o reemplaza) el código vivo de un correo.
 *
 * Usa un `updateMany` condicional en vez de "borrar y crear" (el patrón de
 * `generatePasswordResetToken` en src/lib/tokens.ts): ese patrón es una
 * lectura-modificación-escritura con ventana de carrera que aquí reiniciaría
 * el cooldown en silencio. `updateMany` con un `where` que incluye la
 * condición de cooldown es atómico en Postgres — o actualiza una fila que
 * cumple la condición, o no actualiza nada.
 */
export const issueVerificationCode = async (email: string): Promise<IssueResult> => {
  const now = new Date();
  const code = generateSixDigitCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expires = new Date(now.getTime() + VERIFICATION_CODE_TTL_MS);
  const windowStart = new Date(now.getTime() - VERIFICATION_SEND_WINDOW_MS);
  const cooldownCutoff = new Date(now.getTime() - VERIFICATION_RESEND_COOLDOWN_MS);

  const updated = await db.emailVerificationCode.updateMany({
    where: {
      email,
      lastSentAt: { lte: cooldownCutoff },
      OR: [
        { createdAt: { lt: windowStart } },
        { sendCount: { lt: VERIFICATION_MAX_SENDS_PER_WINDOW } },
      ],
    },
    data: {
      codeHash,
      expires,
      attempts: 0,
      lastSentAt: now,
      sendCount: { increment: 1 },
    },
  });

  if (updated.count === 1) {
    return { ok: true, code, expires };
  }

  try {
    await db.emailVerificationCode.create({
      data: { email, codeHash, expires, attempts: 0, sendCount: 1, lastSentAt: now },
    });
    return { ok: true, code, expires };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Ya existe una fila para este correo: el updateMany de arriba no la
      // tocó, así que está en cooldown o agotó el cupo de envíos. Releerla
      // para distinguir cuál y devolver un mensaje útil.
      const existing = await db.emailVerificationCode.findUnique({ where: { email } });
      if (!existing) {
        // Carrera improbable: alguien la borró entre el create fallido y esta
        // lectura (p. ej. se verificó justo ahora). Tratar como "sin cupo" es
        // más seguro que reintentar en un bucle.
        return { ok: false, reason: "send_limit" };
      }

      const stillCoolingDown = existing.lastSentAt > cooldownCutoff;
      if (stillCoolingDown) {
        const retryAfterMs =
          existing.lastSentAt.getTime() + VERIFICATION_RESEND_COOLDOWN_MS - now.getTime();
        return {
          ok: false,
          reason: "cooldown",
          retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
        };
      }
      return { ok: false, reason: "send_limit" };
    }
    throw error;
  }
};

export type VerifyResult =
  | { status: "ok" }
  | { status: "no_code" }
  | { status: "expired" }
  | { status: "too_many_attempts" }
  | { status: "invalid"; remaining: number };

/**
 * Verifica un código contra el correo indicado.
 *
 * ORDEN CRÍTICO, no reordenar:
 *   1. Fila inexistente -> no_code.
 *   2. Expirada -> se borra y se devuelve expired ANTES de tocar `attempts`,
 *      para que un código ya muerto no consuma intentos.
 *   3. Incremento atómico de `attempts` guardado por `attempts < MAX` -> si
 *      no hay fila que cumpla la condición, ya se agotaron. El incremento
 *      ocurre ANTES del bcrypt.compare: fail-closed, un crash a mitad de la
 *      verificación igual consume el intento.
 *   4. bcrypt.compare — constante en tiempo, sin canal lateral por timing.
 *   5. Éxito: marcar emailVerified y borrar la fila en la MISMA transacción,
 *      así el borrado (que garantiza un solo uso) no puede perderse aunque
 *      la escritura del flag falle.
 */
export const verifyVerificationCode = async (
  email: string,
  code: string
): Promise<VerifyResult> => {
  const row = await db.emailVerificationCode.findUnique({ where: { email } });
  if (!row) {
    return { status: "no_code" };
  }

  if (row.expires < new Date()) {
    await db.emailVerificationCode.delete({ where: { email } });
    return { status: "expired" };
  }

  const bumped = await db.emailVerificationCode.updateMany({
    where: { email, attempts: { lt: VERIFICATION_MAX_ATTEMPTS } },
    data: { attempts: { increment: 1 } },
  });
  if (bumped.count === 0) {
    return { status: "too_many_attempts" };
  }
  const newAttempts = row.attempts + 1;

  const matches = await bcrypt.compare(code, row.codeHash);
  if (!matches) {
    return { status: "invalid", remaining: Math.max(0, VERIFICATION_MAX_ATTEMPTS - newAttempts) };
  }

  await db.$transaction([
    db.user.update({ where: { email }, data: { emailVerified: new Date() } }),
    db.emailVerificationCode.delete({ where: { email } }),
  ]);
  return { status: "ok" };
};

/** Borra el código vivo de un correo, si existe. Usado al limpiar tras cancelar. */
export const clearVerificationCode = async (email: string): Promise<void> => {
  await db.emailVerificationCode.deleteMany({ where: { email } });
};
