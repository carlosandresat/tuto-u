import { describe, it, expect } from "vitest";
import {
  ecuadorDayStartUtc,
  getPeriodStatus,
  isPeriodClosed,
  periodLabel,
  periodLastDay,
  periodRangeFromDays,
  rangesOverlap,
  utcToEcuadorDay,
} from "@/lib/academic-period";

describe("lib/academic-period", () => {
  it("debería etiquetar los periodos con números romanos", () => {
    expect(periodLabel({ year: 2026, term: 1 })).toBe("2026-I");
    expect(periodLabel({ year: 2026, term: 2 })).toBe("2026-II");
  });

  it("debería convertir un día de Ecuador a la medianoche de Ecuador en UTC", () => {
    expect(ecuadorDayStartUtc("2026-03-02").toISOString()).toBe("2026-03-02T05:00:00.000Z");
  });

  it("debería volver al mismo día en ambos sentidos de la conversión", () => {
    for (const day of ["2026-01-01", "2026-02-28", "2026-12-31", "2028-02-29"]) {
      expect(utcToEcuadorDay(ecuadorDayStartUtc(day))).toBe(day);
    }
  });

  it("debería tomar las 23:00 de Ecuador como el mismo día aunque en UTC ya sea el siguiente", () => {
    // 2026-03-02 23:00 en Ecuador = 2026-03-03 04:00 UTC
    expect(utcToEcuadorDay(new Date("2026-03-03T04:00:00.000Z"))).toBe("2026-03-02");
  });

  it("debería construir un rango semiabierto que incluye el último día completo", () => {
    const range = periodRangeFromDays("2026-03-02", "2026-07-31");
    expect(range.startsAt.toISOString()).toBe("2026-03-02T05:00:00.000Z");
    expect(range.endsAt.toISOString()).toBe("2026-08-01T05:00:00.000Z");
    expect(periodLastDay(range.endsAt)).toBe("2026-07-31");
  });

  it("debería clasificar el periodo como pasado, vigente o futuro", () => {
    const range = periodRangeFromDays("2026-03-02", "2026-07-31");
    expect(getPeriodStatus(range, new Date("2026-03-02T04:59:59.000Z"))).toBe("future");
    expect(getPeriodStatus(range, new Date("2026-03-02T05:00:00.000Z"))).toBe("current");
    // Último minuto del último día en Ecuador: todavía vigente.
    expect(getPeriodStatus(range, new Date("2026-08-01T04:59:00.000Z"))).toBe("current");
    expect(getPeriodStatus(range, new Date("2026-08-01T05:00:00.000Z"))).toBe("past");
    expect(isPeriodClosed(range, new Date("2026-08-01T05:00:00.000Z"))).toBe(true);
  });

  it("debería detectar solapamientos pero no periodos contiguos", () => {
    const first = periodRangeFromDays("2026-03-02", "2026-07-31");
    const contiguous = periodRangeFromDays("2026-08-01", "2026-12-20");
    const overlapping = periodRangeFromDays("2026-07-31", "2026-12-20");
    expect(rangesOverlap(first, contiguous)).toBe(false);
    expect(rangesOverlap(first, overlapping)).toBe(true);
  });
});
