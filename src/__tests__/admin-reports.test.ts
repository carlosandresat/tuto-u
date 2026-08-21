import { vi, describe, it, expect, beforeEach } from "vitest";
import { getReports, getReportCount } from "@/data/admin-reports";
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
      sessionReport: {
        findMany: vi.fn(),
        count: vi.fn(),
      },
    },
  };
});

describe("data/admin-reports", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(requireAdmin).mockResolvedValue({
      userId: "admin1",
      email: "admin@yachaytech.edu.ec",
    });
  });

  describe("getReports", () => {
    it("debería rechazar cuando requireAdmin lanza una excepción", async () => {
      vi.mocked(requireAdmin).mockRejectedValue(new Error("Unauthorized"));

      await expect(getReports()).rejects.toThrow();
      expect(db.sessionReport.findMany).not.toHaveBeenCalled();
    });

    it("debería consultar con requireAdmin resuelto e incluir contexto de sesión y ambas partes", async () => {
      vi.mocked(db.sessionReport.findMany).mockResolvedValue([]);

      await getReports();

      expect(requireAdmin).toHaveBeenCalled();
      expect(db.sessionReport.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: "desc" },
          include: expect.objectContaining({
            reporter: expect.any(Object),
            session: expect.any(Object),
          }),
        })
      );
    });

    it("debería identificar a la contraparte como el tutor cuando el reportero es el estudiante", async () => {
      const createdAt = new Date("2026-01-05T00:00:00Z");
      vi.mocked(db.sessionReport.findMany).mockResolvedValue([
        {
          id: 1,
          description: "No se presentó a la tutoría",
          createdAt,
          reporterId: "student1",
          sessionId: 10,
          reporter: {
            firstname: "Ana",
            lastname: "Pérez",
            email: "ana@yachaytech.edu.ec",
            whatsapp: "0999999999",
          },
          session: {
            sessionDateTime: createdAt,
            topic: "Derivadas",
            status: "accepted",
            course: { name: "Cálculo I" },
            student: {
              id: "student1",
              firstname: "Ana",
              lastname: "Pérez",
              email: "ana@yachaytech.edu.ec",
              whatsapp: "0999999999",
            },
            tutor: {
              id: "tutor1",
              firstname: "Luis",
              lastname: "Gómez",
              email: "luis@yachaytech.edu.ec",
              whatsapp: "0988888888",
            },
          },
        },
      ] as any);

      const result = await getReports();

      expect(result).toEqual([
        {
          reportId: 1,
          description: "No se presentó a la tutoría",
          createdAt,
          reporterFullname: "Ana Pérez",
          reporterEmail: "ana@yachaytech.edu.ec",
          reporterWhatsapp: "0999999999",
          counterpartFullname: "Luis Gómez",
          counterpartEmail: "luis@yachaytech.edu.ec",
          counterpartWhatsapp: "0988888888",
          sessionId: 10,
          sessionDateTime: createdAt,
          sessionTopic: "Derivadas",
          sessionCourse: "Cálculo I",
          sessionStatus: "accepted",
        },
      ]);
    });

    it("debería identificar a la contraparte como el estudiante cuando el reportero es el tutor", async () => {
      const createdAt = new Date("2026-01-05T00:00:00Z");
      vi.mocked(db.sessionReport.findMany).mockResolvedValue([
        {
          id: 2,
          description: "Conducta inapropiada",
          createdAt,
          reporterId: "tutor1",
          sessionId: 11,
          reporter: {
            firstname: "Luis",
            lastname: "Gómez",
            email: "luis@yachaytech.edu.ec",
            whatsapp: "0988888888",
          },
          session: {
            sessionDateTime: createdAt,
            topic: "Álgebra",
            status: "accepted",
            course: { name: "Álgebra Lineal" },
            student: {
              id: "student2",
              firstname: "Ana",
              lastname: "Pérez",
              email: "ana@yachaytech.edu.ec",
              whatsapp: "0999999999",
            },
            tutor: {
              id: "tutor1",
              firstname: "Luis",
              lastname: "Gómez",
              email: "luis@yachaytech.edu.ec",
              whatsapp: "0988888888",
            },
          },
        },
      ] as any);

      const result = await getReports();

      expect(result[0].counterpartFullname).toBe("Ana Pérez");
      expect(result[0].counterpartEmail).toBe("ana@yachaytech.edu.ec");
    });

    it("debería lanzar un error genérico si la consulta a la base falla", async () => {
      vi.mocked(db.sessionReport.findMany).mockRejectedValue(new Error("DB down"));

      await expect(getReports()).rejects.toThrow("Unable to fetch session reports.");
    });
  });

  describe("getReportCount", () => {
    it("debería rechazar cuando requireAdmin lanza una excepción", async () => {
      vi.mocked(requireAdmin).mockRejectedValue(new Error("Unauthorized"));

      await expect(getReportCount()).rejects.toThrow();
      expect(db.sessionReport.count).not.toHaveBeenCalled();
    });

    it("debería devolver el conteo total de reportes tras pasar requireAdmin", async () => {
      vi.mocked(db.sessionReport.count).mockResolvedValue(7);

      const result = await getReportCount();

      expect(requireAdmin).toHaveBeenCalled();
      expect(result).toBe(7);
    });
  });
});
