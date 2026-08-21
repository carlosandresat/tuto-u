import { describe, it, expect } from "vitest";
import { APP_TIME_ZONE, formatAppDateTime, formatAppDate } from "@/lib/app-time";

// Normaliza espacios NBSP/narrow que algunas versiones de ICU insertan entre
// hora y minutos, para que la comparación no dependa de la versión de Node.
const norm = (value: string) => value.replace(/[  ]/g, " ");

describe("lib/app-time", () => {
  it("debería fijar el huso horario del producto en America/Guayaquil", () => {
    expect(APP_TIME_ZONE).toBe("America/Guayaquil");
  });

  describe("formatAppDateTime", () => {
    it("debería formatear una sesión nocturna en el día y hora de Ecuador, no del servidor", () => {
      // 2026-08-22T02:00:00Z son las 21:00 del 21 de agosto en Ecuador (UTC-5).
      // Sin fijar el huso, un servidor en UTC (Vercel) mostraría "22 de agosto...02:00":
      // día Y hora equivocados. Esta es la aserción que prueba el bug de F1.
      const result = formatAppDateTime(new Date("2026-08-22T02:00:00Z"));
      expect(norm(result)).toBe("21 de agosto de 2026, 21:00");
    });

    it("debería aceptar un string ISO igual que un Date", () => {
      const result = formatAppDateTime("2026-08-22T02:00:00Z");
      expect(norm(result)).toBe("21 de agosto de 2026, 21:00");
    });
  });

  describe("formatAppDate", () => {
    it("debería formatear la fecha corta de un logro en el huso de Ecuador", () => {
      const result = formatAppDate(new Date("2026-08-22T02:00:00Z"));
      expect(norm(result)).toBe("21 ago 2026");
    });
  });
});
