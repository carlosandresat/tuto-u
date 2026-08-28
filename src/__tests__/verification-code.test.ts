import { vi, describe, it, expect, beforeEach } from "vitest";

// vi.mock se "hoistea" sobre todo el archivo, así que la clase de error no
// puede ser un `const`/`class` normal a nivel de módulo — vitest exige
// vi.hoisted() para cualquier valor que la factory de vi.mock necesite leer.
// Misma forma que Prisma.PrismaClientKnownRequestError (constructor con
// `code`), compartida entre el mock del módulo generado y este archivo, así
// el `instanceof` dentro de src/lib/verification-code.ts funciona contra la
// MISMA clase que instanciamos aquí — sin depender de construir la clase real
// de Prisma, frágil entre versiones del runtime.
const { FakePrismaClientKnownRequestError } = vi.hoisted(() => {
  class FakePrismaClientKnownRequestError extends Error {
    code: string;
    constructor(message: string, code: string) {
      super(message);
      this.code = code;
    }
  }
  return { FakePrismaClientKnownRequestError };
});

vi.mock("@/generated/prisma/client", () => ({
  Prisma: { PrismaClientKnownRequestError: FakePrismaClientKnownRequestError },
}));

vi.mock("@/lib/db", () => {
  return {
    db: {
      emailVerificationCode: {
        updateMany: vi.fn(),
        create: vi.fn(),
        findUnique: vi.fn(),
        delete: vi.fn(),
        deleteMany: vi.fn(),
      },
      user: {
        update: vi.fn(),
      },
      $transaction: vi.fn(),
    },
  };
});

import { db } from "@/lib/db";
import {
  generateSixDigitCode,
  issueVerificationCode,
  verifyVerificationCode,
  VERIFICATION_MAX_ATTEMPTS,
  VERIFICATION_MAX_SENDS_PER_WINDOW,
  VERIFICATION_RESEND_COOLDOWN_MS,
} from "@/lib/verification-code";

describe("lib/verification-code", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("generateSixDigitCode", () => {
    it("debería generar siempre un código de exactamente 6 dígitos numéricos", () => {
      for (let i = 0; i < 5000; i++) {
        expect(generateSixDigitCode()).toMatch(/^\d{6}$/);
      }
    });

    it("debería rellenar con ceros a la izquierda los códigos menores a 100000", () => {
      // Con 5000 muestras sobre un espacio uniforme de 10^6, la probabilidad de
      // que NINGUNA caiga por debajo de 100000 (10% del espacio) es astronómicamente
      // baja — esto prueba que padStart realmente se ejerce, no solo que existe.
      const samples = Array.from({ length: 5000 }, () => generateSixDigitCode());
      const hasLeadingZero = samples.some((code) => code.startsWith("0"));
      const hasHighValue = samples.some((code) => Number(code) >= 100000);
      expect(hasLeadingZero).toBe(true);
      expect(hasHighValue).toBe(true);
    });
  });

  describe("verifyVerificationCode", () => {
    it("debería devolver no_code cuando no existe una fila para el correo", async () => {
      vi.mocked(db.emailVerificationCode.findUnique).mockResolvedValue(null);

      const result = await verifyVerificationCode("a@yachaytech.edu.ec", "123456");

      expect(result).toEqual({ status: "no_code" });
      expect(db.emailVerificationCode.updateMany).not.toHaveBeenCalled();
    });

    it("debería borrar la fila y devolver expired SIN incrementar intentos", async () => {
      vi.mocked(db.emailVerificationCode.findUnique).mockResolvedValue({
        id: "1",
        email: "a@yachaytech.edu.ec",
        codeHash: "hash",
        expires: new Date(Date.now() - 1000),
        attempts: 0,
        sendCount: 1,
        lastSentAt: new Date(),
        createdAt: new Date(),
      } as any);

      const result = await verifyVerificationCode("a@yachaytech.edu.ec", "123456");

      expect(result).toEqual({ status: "expired" });
      expect(db.emailVerificationCode.delete).toHaveBeenCalledWith({
        where: { email: "a@yachaytech.edu.ec" },
      });
      // Un código ya expirado no debe consumir intentos: el orden crítico del
      // módulo exige que la expiración se resuelva ANTES del incremento.
      expect(db.emailVerificationCode.updateMany).not.toHaveBeenCalled();
    });

    it("debería devolver too_many_attempts cuando el incremento atómico no afecta ninguna fila", async () => {
      vi.mocked(db.emailVerificationCode.findUnique).mockResolvedValue({
        id: "1",
        email: "a@yachaytech.edu.ec",
        codeHash: "hash",
        expires: new Date(Date.now() + 60_000),
        attempts: VERIFICATION_MAX_ATTEMPTS,
        sendCount: 1,
        lastSentAt: new Date(),
        createdAt: new Date(),
      } as any);
      vi.mocked(db.emailVerificationCode.updateMany).mockResolvedValue({ count: 0 });

      const result = await verifyVerificationCode("a@yachaytech.edu.ec", "123456");

      expect(result).toEqual({ status: "too_many_attempts" });
    });

    it("debería devolver invalid con los intentos restantes cuando el código no coincide", async () => {
      const bcrypt = await import("bcryptjs");
      const realHash = await bcrypt.hash("999999", 10);
      vi.mocked(db.emailVerificationCode.findUnique).mockResolvedValue({
        id: "1",
        email: "a@yachaytech.edu.ec",
        codeHash: realHash,
        expires: new Date(Date.now() + 60_000),
        attempts: 2,
        sendCount: 1,
        lastSentAt: new Date(),
        createdAt: new Date(),
      } as any);
      vi.mocked(db.emailVerificationCode.updateMany).mockResolvedValue({ count: 1 });

      const result = await verifyVerificationCode("a@yachaytech.edu.ec", "123456");

      // attempts pasó de 2 a 3; quedan MAX - 3
      expect(result).toEqual({ status: "invalid", remaining: VERIFICATION_MAX_ATTEMPTS - 3 });
      expect(db.$transaction).not.toHaveBeenCalled();
    });

    it("debería marcar emailVerified y borrar el código en una sola transacción cuando el código coincide", async () => {
      const bcrypt = await import("bcryptjs");
      const realHash = await bcrypt.hash("123456", 10);
      vi.mocked(db.emailVerificationCode.findUnique).mockResolvedValue({
        id: "1",
        email: "a@yachaytech.edu.ec",
        codeHash: realHash,
        expires: new Date(Date.now() + 60_000),
        attempts: 0,
        sendCount: 1,
        lastSentAt: new Date(),
        createdAt: new Date(),
      } as any);
      vi.mocked(db.emailVerificationCode.updateMany).mockResolvedValue({ count: 1 });
      vi.mocked(db.$transaction).mockResolvedValue([{} as any, {} as any]);

      const result = await verifyVerificationCode("a@yachaytech.edu.ec", "123456");

      expect(result).toEqual({ status: "ok" });
      expect(db.$transaction).toHaveBeenCalledTimes(1);
    });
  });

  describe("issueVerificationCode", () => {
    it("debería reiniciar el contador a 1 y mover la ventana cuando la ventana ya venció", async () => {
      // El primer updateMany (caso "ventana vencida") encuentra la fila.
      vi.mocked(db.emailVerificationCode.updateMany).mockResolvedValueOnce({ count: 1 });

      const result = await issueVerificationCode("a@yachaytech.edu.ec");

      expect(result.ok).toBe(true);
      expect(db.emailVerificationCode.updateMany).toHaveBeenCalledTimes(1);
      const [call] = vi.mocked(db.emailVerificationCode.updateMany).mock.calls[0];
      // Reinicio, no incremento: si esto fuera { increment: 1 } el cupo por
      // ventana nunca volvería a empezar de cero.
      expect(call.data.sendCount).toBe(1);
      expect(call.data.windowStartedAt).toBeInstanceOf(Date);
      expect(call.where?.windowStartedAt).toHaveProperty("lt");
    });

    it("debería incrementar el contador sin mover la ventana cuando sigue abierta y queda cupo", async () => {
      // El primer updateMany no encuentra fila (la ventana sigue abierta),
      // el segundo sí.
      vi.mocked(db.emailVerificationCode.updateMany)
        .mockResolvedValueOnce({ count: 0 })
        .mockResolvedValueOnce({ count: 1 });

      const result = await issueVerificationCode("a@yachaytech.edu.ec");

      expect(result.ok).toBe(true);
      expect(db.emailVerificationCode.updateMany).toHaveBeenCalledTimes(2);
      const [secondCall] = vi.mocked(db.emailVerificationCode.updateMany).mock.calls[1];
      expect(secondCall.data.sendCount).toEqual({ increment: 1 });
      // La ventana NO se toca en este camino.
      expect(secondCall.data.windowStartedAt).toBeUndefined();
      // Y el cupo sí se exige aquí.
      expect(secondCall.where?.sendCount).toEqual({
        lt: VERIFICATION_MAX_SENDS_PER_WINDOW,
      });
    });

    it("no debería depender de createdAt para decidir la ventana", async () => {
      // Regresión: la versión anterior usaba `createdAt` (fijo desde la
      // creación de la fila) para saber si la ventana había vencido, así que
      // toda fila con más de una hora de vida saltaba el tope para siempre.
      vi.mocked(db.emailVerificationCode.updateMany)
        .mockResolvedValueOnce({ count: 0 })
        .mockResolvedValueOnce({ count: 1 });

      await issueVerificationCode("a@yachaytech.edu.ec");

      for (const [call] of vi.mocked(db.emailVerificationCode.updateMany).mock.calls) {
        expect(JSON.stringify(call.where)).not.toContain("createdAt");
      }
    });

    it("debería crear la fila cuando no existía ninguna previa", async () => {
      vi.mocked(db.emailVerificationCode.updateMany).mockResolvedValue({ count: 0 });
      vi.mocked(db.emailVerificationCode.create).mockResolvedValue({} as any);

      const result = await issueVerificationCode("a@yachaytech.edu.ec");

      expect(result.ok).toBe(true);
      const [createCall] = vi.mocked(db.emailVerificationCode.create).mock.calls[0];
      expect(createCall.data.sendCount).toBe(1);
      expect(createCall.data.windowStartedAt).toBeInstanceOf(Date);
    });

    it("debería devolver cooldown con un retryAfterSeconds plausible cuando el create choca con P2002 y la fila sigue en cooldown", async () => {
      vi.mocked(db.emailVerificationCode.updateMany).mockResolvedValue({ count: 0 });
      vi.mocked(db.emailVerificationCode.create).mockRejectedValue(
        new FakePrismaClientKnownRequestError("Unique constraint failed", "P2002")
      );
      const lastSentAt = new Date(Date.now() - 10_000); // hace 10s, cooldown es 60s
      vi.mocked(db.emailVerificationCode.findUnique).mockResolvedValue({
        id: "1",
        email: "a@yachaytech.edu.ec",
        codeHash: "hash",
        expires: new Date(Date.now() + 60_000),
        attempts: 0,
        sendCount: 1,
        lastSentAt,
        createdAt: new Date(),
      } as any);

      const result = await issueVerificationCode("a@yachaytech.edu.ec");

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.reason).toBe("cooldown");
        if (result.reason === "cooldown") {
          const remainingMs = VERIFICATION_RESEND_COOLDOWN_MS - 10_000;
          const expectedSeconds = Math.ceil(remainingMs / 1000);
          expect(result.retryAfterSeconds).toBeGreaterThan(0);
          expect(result.retryAfterSeconds).toBeLessThanOrEqual(expectedSeconds + 1);
        }
      }
    });

    it("debería devolver send_limit cuando el create choca con P2002 y el cooldown ya pasó", async () => {
      vi.mocked(db.emailVerificationCode.updateMany).mockResolvedValue({ count: 0 });
      vi.mocked(db.emailVerificationCode.create).mockRejectedValue(
        new FakePrismaClientKnownRequestError("Unique constraint failed", "P2002")
      );
      // lastSentAt hace más de un cooldown: el updateMany de arriba no pudo
      // haber fallado por cooldown, así que la única explicación es el tope
      // de envíos por ventana.
      vi.mocked(db.emailVerificationCode.findUnique).mockResolvedValue({
        id: "1",
        email: "a@yachaytech.edu.ec",
        codeHash: "hash",
        expires: new Date(Date.now() + 60_000),
        attempts: 0,
        sendCount: 10,
        lastSentAt: new Date(Date.now() - 5 * 60_000),
        createdAt: new Date(),
      } as any);

      const result = await issueVerificationCode("a@yachaytech.edu.ec");

      expect(result).toEqual({ ok: false, reason: "send_limit" });
    });
  });
});
