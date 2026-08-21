import { vi, describe, it, expect, beforeEach } from "vitest";
import {
  ACTIVE_TUTOR_WHERE,
  POSITIVE_PRICE_WHERE,
  getTutorsPerCourse,
  getAveragePricePerCourse,
  getAveragePricePerDuration,
  getSessionsByStatus,
  getTutorSupply,
} from "@/data/admin-stats";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

// Admin gating ya está cubierto por admin.test.ts. Aquí solo nos interesa que cada
// función efectivamente llame a requireAdmin() antes de tocar la base.
vi.mock("@/lib/admin", () => ({
  requireAdmin: vi.fn(),
}));

vi.mock("@/lib/db", () => {
  return {
    db: {
      user: {
        count: vi.fn(),
        findMany: vi.fn(),
      },
      course: {
        findMany: vi.fn(),
      },
      tutorCourse: {
        findMany: vi.fn(),
      },
      userPricingConfiguration: {
        findMany: vi.fn(),
      },
      individualSession: {
        groupBy: vi.fn(),
        count: vi.fn(),
      },
    },
  };
});

describe("data/admin-stats", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(requireAdmin).mockResolvedValue({ userId: "admin1", email: "admin@yachaytech.edu.ec" });
  });

  describe("ACTIVE_TUTOR_WHERE", () => {
    it("debería tener exactamente las tres condiciones que definen a un tutor activo", () => {
      // Test-meta: falla si alguien "optimiza" una condición fuera del predicado
      // compartido, que es exactamente el tipo de drift que este refactor corrige.
      expect(Object.keys(ACTIVE_TUTOR_WHERE).sort()).toEqual([
        "availabilities",
        "tutorCourses",
        "tutor_pricing",
      ]);
    });
  });

  describe("getTutorsPerCourse", () => {
    it("debería rechazar cuando requireAdmin lanza una excepción", async () => {
      vi.mocked(requireAdmin).mockRejectedValue(new Error("Unauthorized"));

      await expect(getTutorsPerCourse()).rejects.toThrow();
      expect(db.course.findMany).not.toHaveBeenCalled();
    });

    it("debería filtrar el conteo de tutores por curso usando ACTIVE_TUTOR_WHERE", async () => {
      vi.mocked(db.course.findMany).mockResolvedValue([
        { id: 1, name: "Cálculo I", _count: { tutorCourses: 3 } },
      ] as any);

      await getTutorsPerCourse();

      expect(db.course.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          _count: { select: { tutorCourses: { where: { tutor: ACTIVE_TUTOR_WHERE } } } },
        },
      });
    });

    it("debería incluir cursos con cero tutores activos en el resultado", async () => {
      vi.mocked(db.course.findMany).mockResolvedValue([
        { id: 1, name: "Cálculo I", _count: { tutorCourses: 3 } },
        { id: 2, name: "Física I", _count: { tutorCourses: 0 } },
      ] as any);

      const result = await getTutorsPerCourse();

      expect(result).toContainEqual({ courseId: 2, course: "Física I", tutors: 0 });
    });

    it("debería ordenar descendente por tutores y desempatar por nombre en español", async () => {
      vi.mocked(db.course.findMany).mockResolvedValue([
        { id: 1, name: "Analisis", _count: { tutorCourses: 2 } },
        { id: 2, name: "Álgebra", _count: { tutorCourses: 2 } },
        { id: 3, name: "Física I", _count: { tutorCourses: 5 } },
      ] as any);

      const result = await getTutorsPerCourse();

      expect(result.map((r) => r.course)).toEqual(["Física I", "Álgebra", "Analisis"]);
    });
  });

  describe("getAveragePricePerCourse (vía fetchCoursePriceRows)", () => {
    it("debería rechazar cuando requireAdmin lanza una excepción", async () => {
      vi.mocked(requireAdmin).mockRejectedValue(new Error("Unauthorized"));

      await expect(getAveragePricePerCourse()).rejects.toThrow();
      expect(db.tutorCourse.findMany).not.toHaveBeenCalled();
    });

    it("debería filtrar tutores activos por fuera y tarifas positivas por dentro", async () => {
      vi.mocked(db.tutorCourse.findMany).mockResolvedValue([]);

      await getAveragePricePerCourse();

      expect(db.tutorCourse.findMany).toHaveBeenCalledWith({
        where: { tutor: ACTIVE_TUTOR_WHERE },
        select: {
          courseId: true,
          course: { select: { name: true } },
          tutor: {
            select: {
              tutor_pricing: {
                where: POSITIVE_PRICE_WHERE,
                select: { duration: true, price: true },
              },
            },
          },
        },
      });
    });

    it("debería promediar solo las tarifas devueltas (ya excluyen las de 0)", async () => {
      vi.mocked(db.tutorCourse.findMany).mockResolvedValue([
        {
          courseId: 1,
          course: { name: "Cálculo I" },
          tutor: { tutor_pricing: [{ duration: 60, price: 10 }] },
        },
        {
          courseId: 1,
          course: { name: "Cálculo I" },
          tutor: { tutor_pricing: [{ duration: 90, price: 20 }] },
        },
      ] as any);

      const result = await getAveragePricePerCourse();

      expect(result).toEqual([
        { courseId: 1, course: "Cálculo I", averagePrice: 15, sampleSize: 2 },
      ]);
    });
  });

  describe("getAveragePricePerDuration", () => {
    it("debería rechazar cuando requireAdmin lanza una excepción", async () => {
      vi.mocked(requireAdmin).mockRejectedValue(new Error("Unauthorized"));

      await expect(getAveragePricePerDuration()).rejects.toThrow();
      expect(db.userPricingConfiguration.findMany).not.toHaveBeenCalled();
    });

    it("debería combinar POSITIVE_PRICE_WHERE y ACTIVE_TUTOR_WHERE en la consulta", async () => {
      vi.mocked(db.userPricingConfiguration.findMany).mockResolvedValue([]);

      await getAveragePricePerDuration();

      expect(db.userPricingConfiguration.findMany).toHaveBeenCalledWith({
        where: { ...POSITIVE_PRICE_WHERE, tutor: ACTIVE_TUTOR_WHERE },
        select: { duration: true, price: true },
      });
    });
  });

  describe("getTutorSupply", () => {
    it("debería rechazar cuando requireAdmin lanza una excepción", async () => {
      vi.mocked(requireAdmin).mockRejectedValue(new Error("Unauthorized"));

      await expect(getTutorSupply()).rejects.toThrow();
      expect(db.user.count).not.toHaveBeenCalled();
    });

    it("debería consultar tutores activos con ACTIVE_TUTOR_WHERE y voluntarios con el AND compuesto", async () => {
      vi.mocked(db.user.count)
        .mockResolvedValueOnce(19) // activeTutors
        .mockResolvedValueOnce(4) // voluntaryTutors
        .mockResolvedValueOnce(19) // tutorsWithCourses
        .mockResolvedValueOnce(66) // tutorsWithAvailability
        .mockResolvedValueOnce(21) // tutorsWithPricing
        .mockResolvedValueOnce(200); // totalUsers

      const result = await getTutorSupply();

      // El orden de las llamadas dentro del Promise.all es el que fija a qué campo
      // corresponde cada mockResolvedValueOnce — ver los comentarios arriba.
      expect(db.user.count).toHaveBeenNthCalledWith(1, { where: ACTIVE_TUTOR_WHERE });
      expect(db.user.count).toHaveBeenNthCalledWith(2, {
        where: {
          AND: [ACTIVE_TUTOR_WHERE, { tutor_pricing: { none: POSITIVE_PRICE_WHERE } }],
        },
      });

      expect(result).toEqual({
        activeTutors: 19,
        voluntaryTutors: 4,
        tutorsWithCourses: 19,
        tutorsWithAvailability: 66,
        tutorsWithPricing: 21,
        totalUsers: 200,
        activeTutorsShare: 9.5,
      });
    });

    it("debería devolver activeTutorsShare en 0 (nunca NaN) cuando no hay usuarios", async () => {
      vi.mocked(db.user.count)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0);

      const result = await getTutorSupply();

      expect(result.activeTutorsShare).toBe(0);
      expect(Number.isNaN(result.activeTutorsShare)).toBe(false);
    });
  });

  describe("getSessionsByStatus", () => {
    it("debería rechazar cuando requireAdmin lanza una excepción", async () => {
      vi.mocked(requireAdmin).mockRejectedValue(new Error("Unauthorized"));

      await expect(getSessionsByStatus()).rejects.toThrow();
      expect(db.individualSession.groupBy).not.toHaveBeenCalled();
    });

    it("debería incluir los cinco estados conocidos en cero cuando solo hay uno en la base", async () => {
      vi.mocked(db.individualSession.groupBy).mockResolvedValue([
        { status: "requested", _count: { _all: 5 } },
      ] as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(0);

      const result = await getSessionsByStatus();

      expect(result).toEqual([
        { status: "requested", label: "Solicitadas", sessions: 5 },
        { status: "accepted", label: "Aceptadas (por realizarse)", sessions: 0 },
        { status: "completed", label: "Completadas", sessions: 0 },
        { status: "rejected", label: "Rechazadas", sessions: 0 },
        { status: "canceled", label: "Canceladas", sessions: 0 },
      ]);
    });

    it("debería agregar un único valor desconocido en una fila 'Otras'", async () => {
      vi.mocked(db.individualSession.groupBy).mockResolvedValue([
        { status: "requested", _count: { _all: 2 } },
        { status: "scheduled", _count: { _all: 3 } }, // el fantasma del comentario viejo
      ] as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(0);

      const result = await getSessionsByStatus();

      expect(result).toContainEqual({ status: "other", label: "Otras", sessions: 3 });
    });

    it("debería agregar dos valores desconocidos en una sola fila 'Otras'", async () => {
      vi.mocked(db.individualSession.groupBy).mockResolvedValue([
        { status: "scheduled", _count: { _all: 2 } },
        { status: "cancelled", _count: { _all: 1 } }, // dos "l" — nunca escrito por la app
      ] as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(0);

      const result = await getSessionsByStatus();

      const otherRows = result.filter((row) => row.status === "other");
      expect(otherRows).toEqual([{ status: "other", label: "Otras", sessions: 3 }]);
    });

    it("debería separar aceptadas pendientes de completadas", async () => {
      vi.mocked(db.individualSession.groupBy).mockResolvedValue([
        { status: "accepted", _count: { _all: 10 } },
      ] as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(4);

      const result = await getSessionsByStatus();

      expect(result).toContainEqual({
        status: "accepted",
        label: "Aceptadas (por realizarse)",
        sessions: 6,
      });
      expect(result).toContainEqual({ status: "completed", label: "Completadas", sessions: 4 });
    });

    it("debería recortar en 0 si completed supera a accepted por la falta de atomicidad", async () => {
      vi.mocked(db.individualSession.groupBy).mockResolvedValue([
        { status: "accepted", _count: { _all: 3 } },
      ] as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(5);

      const result = await getSessionsByStatus();

      const accepted = result.find((row) => row.status === "accepted");
      expect(accepted?.sessions).toBe(0);
    });

    it("debería mantener el orden Solicitadas, Aceptadas, Completadas, Rechazadas, Canceladas, Otras", async () => {
      vi.mocked(db.individualSession.groupBy).mockResolvedValue([
        { status: "requested", _count: { _all: 1 } },
        { status: "accepted", _count: { _all: 1 } },
        { status: "rejected", _count: { _all: 1 } },
        { status: "canceled", _count: { _all: 1 } },
        { status: "scheduled", _count: { _all: 1 } },
      ] as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(0);

      const result = await getSessionsByStatus();

      expect(result.map((row) => row.status)).toEqual([
        "requested",
        "accepted",
        "completed",
        "rejected",
        "canceled",
        "other",
      ]);
    });

    it("debería cuadrar: la suma de las filas es igual al total del groupBy", async () => {
      const groupBy = [
        { status: "requested", _count: { _all: 4 } },
        { status: "accepted", _count: { _all: 10 } },
        { status: "rejected", _count: { _all: 2 } },
        { status: "canceled", _count: { _all: 1 } },
        { status: "scheduled", _count: { _all: 3 } },
      ];
      vi.mocked(db.individualSession.groupBy).mockResolvedValue(groupBy as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(6);

      const result = await getSessionsByStatus();

      const totalFromGroupBy = groupBy.reduce((acc, row) => acc + row._count._all, 0);
      const totalFromRows = result.reduce((acc, row) => acc + row.sessions, 0);
      expect(totalFromRows).toBe(totalFromGroupBy);
    });

    it("no debería agregar una fila 'Otras' cuando todos los valores son conocidos", async () => {
      vi.mocked(db.individualSession.groupBy).mockResolvedValue([
        { status: "requested", _count: { _all: 1 } },
      ] as any);
      vi.mocked(db.individualSession.count).mockResolvedValue(0);

      const result = await getSessionsByStatus();

      expect(result.some((row) => row.status === "other")).toBe(false);
    });
  });
});
