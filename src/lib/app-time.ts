/**
 * Huso horario del producto. Yachay Tech está en Ecuador continental
 * (UTC-5, sin horario de verano).
 *
 * Los timestamps se guardan en UTC (ver CLAUDE.md, "Time is UTC end-to-end").
 * Todo formateo que ocurra en el SERVIDOR debe fijar este huso explícitamente:
 * producción (Vercel) corre en UTC, así que omitirlo desplaza la hora — y a
 * veces el día — respecto de lo que ve el usuario en Ecuador.
 *
 * NO usar en componentes cliente que muestran la hora local del usuario
 * (`student-session-card.tsx`, `tutor-session-card.tsx`): ahí formatear sin
 * fijar huso es CORRECTO y deliberado — se quiere la hora local del
 * navegador, no la de Ecuador.
 */
export const APP_TIME_ZONE = "America/Guayaquil";

/** "21 de agosto de 2026, 21:00" — fecha y hora, huso fijo. */
export function formatAppDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-ES", {
    timeZone: APP_TIME_ZONE,
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "21 ago 2026" — solo fecha, huso fijo. */
export function formatAppDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-ES", {
    timeZone: APP_TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
