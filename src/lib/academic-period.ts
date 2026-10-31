import { APP_TIME_ZONE } from "@/lib/app-time";

/**
 * Periodos académicos: dos por año ("2026-I", "2026-II").
 *
 * En la BD cada periodo es un rango UTC semiabierto [startsAt, endsAt): ambos
 * extremos son la medianoche de Ecuador, y `endsAt` es la medianoche del día
 * SIGUIENTE al último día del periodo. Así "vigente" es simplemente
 * `startsAt <= now < endsAt`, sin casos borde a las 23:59.
 *
 * Los formularios trabajan con días de calendario ("YYYY-MM-DD", lo que da un
 * `<input type="date">`), nunca con `Date` locales del navegador: un `Date`
 * creado en el cliente arrastra el huso del navegador y desplaza el día.
 */

/** Ecuador continental: UTC-5 fijo, sin horario de verano (ver app-time.ts). */
const APP_UTC_OFFSET_HOURS = 5;

export type PeriodStatus = "past" | "current" | "future";
export type PeriodRange = { startsAt: Date; endsAt: Date };

export function periodLabel({ year, term }: { year: number; term: number }): string {
  return `${year}-${term === 1 ? "I" : "II"}`;
}

/** "2026-03-02" → instante UTC de la medianoche de ese día en Ecuador. */
export function ecuadorDayStartUtc(day: string): Date {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, date, APP_UTC_OFFSET_HOURS));
}

/** Inverso de `ecuadorDayStartUtc`: instante → "YYYY-MM-DD" del día en Ecuador. */
export function utcToEcuadorDay(instant: Date): string {
  // en-CA formatea como YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

/** Primer y último día (ambos inclusivos) → rango UTC semiabierto. */
export function periodRangeFromDays(startsOn: string, endsOn: string): PeriodRange {
  const startsAt = ecuadorDayStartUtc(startsOn);
  const endsAt = ecuadorDayStartUtc(endsOn);
  endsAt.setUTCDate(endsAt.getUTCDate() + 1);
  return { startsAt, endsAt };
}

/** Último día inclusivo del periodo, para mostrarlo. */
export function periodLastDay(endsAt: Date): string {
  return utcToEcuadorDay(new Date(endsAt.getTime() - 1));
}

export function getPeriodStatus(period: PeriodRange, now: Date = new Date()): PeriodStatus {
  if (period.endsAt <= now) return "past";
  if (period.startsAt <= now) return "current";
  return "future";
}

/** Un periodo cerrado ya no admite cambios en su lista de mentores. */
export function isPeriodClosed(period: PeriodRange, now: Date = new Date()): boolean {
  return getPeriodStatus(period, now) === "past";
}

/** `where` de Prisma para "el periodo vigente en `now`". */
export function currentPeriodWhere(now: Date = new Date()) {
  return { startsAt: { lte: now }, endsAt: { gt: now } };
}

/** Dos rangos semiabiertos se solapan si cada uno empieza antes de que el otro termine. */
export function rangesOverlap(a: PeriodRange, b: PeriodRange): boolean {
  return a.startsAt < b.endsAt && b.startsAt < a.endsAt;
}
