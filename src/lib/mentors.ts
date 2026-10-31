import { db } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { currentPeriodWhere } from "@/lib/academic-period";

/**
 * Reglas de negocio del programa de mentores. Única fuente de verdad: los
 * listados, el formulario de reserva y la creación de sesiones pasan por aquí.
 *
 * Un usuario es "mentor activo" si su correo tiene una `MentorAssignment` en
 * el periodo vigente. Las asignaciones van por correo (pueden existir antes
 * de que la persona se registre) y se guardan en minúsculas; `User.email` NO
 * está normalizado, así que siempre se compara con `normalizeEmail`.
 */

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

const INSTITUTIONAL_EMAIL = /^[^\s@]+@yachaytech\.edu\.ec$/;

/**
 * Texto pegado por el admin (separado por comas, punto y coma, espacios o
 * saltos de línea) → correos institucionales normalizados y sin duplicados,
 * más los que no lo son, para reportarlos en vez de descartarlos en silencio.
 */
export function parseMentorEmails(raw: string): { emails: string[]; invalid: string[] } {
  const tokens = raw
    .split(/[\s,;]+/)
    .map(normalizeEmail)
    .filter((token) => token.length > 0);
  const unique = Array.from(new Set(tokens));

  return {
    emails: unique.filter((email) => INSTITUTIONAL_EMAIL.test(email)),
    invalid: unique.filter((email) => !INSTITUTIONAL_EMAIL.test(email)),
  };
}

/**
 * De los `userIds` dados, cuáles son mentores activos. Dos consultas fijas sin
 * importar cuántos usuarios entren: úsalo en los listados en vez de llamar a
 * `isActiveMentor` en un bucle.
 */
export async function getActiveMentorIds(
  userIds: string[],
  now: Date = new Date()
): Promise<Set<string>> {
  if (userIds.length === 0) return new Set();

  const users = await db.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true },
  });
  const emails = users.flatMap((u) => (u.email ? [normalizeEmail(u.email)] : []));
  if (emails.length === 0) return new Set();

  const assignments = await db.mentorAssignment.findMany({
    where: { email: { in: emails }, period: currentPeriodWhere(now) },
    select: { email: true },
  });
  const mentorEmails = new Set(assignments.map((a) => a.email));

  return new Set(
    users
      .filter((u) => u.email && mentorEmails.has(normalizeEmail(u.email)))
      .map((u) => u.id)
  );
}

export async function isActiveMentor(userId: string, now: Date = new Date()): Promise<boolean> {
  return (await getActiveMentorIds([userId], now)).has(userId);
}

/**
 * Precio de una sesión, decidido SIEMPRE en el servidor: un mentor activo
 * cobra $0 en cursos de nivelación; en cualquier otro caso rige el precio de
 * su perfil para esa duración.
 *
 * Nunca escribe en `UserPricingConfiguration`: el mentor conserva sus tarifas
 * para el resto de cursos, y las estadísticas de precios (admin-stats.ts) no
 * se contaminan con ceros.
 */
export async function resolveSessionPrice({
  tutorId,
  courseId,
  duration,
  now = new Date(),
}: {
  tutorId: string;
  courseId: number;
  duration: number;
  now?: Date;
}): Promise<{ price: Prisma.Decimal | number } | { error: string }> {
  const [pricingConfig, course] = await Promise.all([
    db.userPricingConfiguration.findFirst({ where: { userId: tutorId, duration } }),
    db.course.findUnique({ where: { id: courseId }, select: { isLeveling: true } }),
  ]);

  // Aun gratis, la duración tiene que estar en el perfil del mentor: es lo que
  // define qué duraciones ofrece.
  if (!pricingConfig) {
    return { error: "No se encontró configuración de precio para este tutor." };
  }

  if (course?.isLeveling && (await isActiveMentor(tutorId, now))) {
    return { price: 0 };
  }

  return { price: pricingConfig.price };
}

/**
 * Otorga a `userId` el logro de cada periodo YA INICIADO en el que `email` fue
 * designado mentor y que todavía no tiene. Idempotente.
 *
 * Se llama de forma perezosa (al abrir los logros) y en cada cambio de la
 * lista de mentores, así no hace falta un cron que detecte el inicio del
 * periodo.
 */
export async function syncMentorAchievements(
  userId: string,
  email: string,
  now: Date = new Date()
): Promise<number[]> {
  const assignments = await db.mentorAssignment.findMany({
    where: { email: normalizeEmail(email), period: { startsAt: { lte: now } } },
    select: { period: { select: { achievementId: true } } },
  });
  if (assignments.length === 0) return [];

  const achievementIds = assignments.map((a) => a.period.achievementId);
  const owned = await db.userAchievement.findMany({
    where: { userId, achievementId: { in: achievementIds } },
    select: { achievementId: true },
  });
  const ownedIds = new Set(owned.map((ua) => ua.achievementId));
  const missing = achievementIds.filter((id) => !ownedIds.has(id));

  if (missing.length > 0) {
    await db.userAchievement.createMany({
      data: missing.map((achievementId) => ({ userId, achievementId })),
    });
  }

  return missing;
}

/** `syncMentorAchievements` para las cuentas (si existen) de varios correos. */
export async function syncMentorAchievementsForEmails(
  emails: string[],
  now: Date = new Date()
): Promise<void> {
  if (emails.length === 0) return;

  const users = await db.user.findMany({
    where: {
      OR: emails.map((email) => ({ email: { equals: email, mode: "insensitive" as const } })),
    },
    select: { id: true, email: true },
  });

  for (const user of users) {
    if (user.email) await syncMentorAchievements(user.id, user.email, now);
  }
}
