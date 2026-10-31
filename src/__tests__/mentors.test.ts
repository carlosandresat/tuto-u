import { vi, describe, it, expect, beforeEach } from "vitest";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { requireMentorAdmin } from "@/lib/admin";
import {
  getActiveMentorIds,
  parseMentorEmails,
  resolveSessionPrice,
  syncMentorAchievements,
} from "@/lib/mentors";
import { addMentors, createAcademicPeriod, removeMentor } from "@/actions/mentors";
import { requestIndividualSession } from "@/actions/session-request";
import { periodRangeFromDays } from "@/lib/academic-period";

vi.mock("@/lib/db", () => {
  return {
    db: {
      user: { findMany: vi.fn(), findUnique: vi.fn() },
      course: { findUnique: vi.fn() },
      userPricingConfiguration: { findFirst: vi.fn() },
      mentorAssignment: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        createMany: vi.fn(),
        delete: vi.fn(),
      },
      academicPeriod: { findMany: vi.fn(), findUnique: vi.fn() },
      userAchievement: { findMany: vi.fn(), createMany: vi.fn() },
      individualSession: { create: vi.fn() },
      $transaction: vi.fn(),
    },
  };
});

vi.mock("@/auth", () => ({ auth: vi.fn() }));

// El gating por rol se prueba aparte (abajo, con la implementación real); en las
// acciones solo interesa qué pasa con y sin permiso.
vi.mock("@/lib/admin", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/admin")>();
  return { ...original, requireMentorAdmin: vi.fn() };
});

vi.mock("@/lib/mail", () => ({ newSessionTutorNotificationEmail: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

const NOW = new Date("2026-10-24T15:00:00.000Z");
const CURRENT = { id: 1, ...periodRangeFromDays("2026-09-01", "2027-01-31"), achievementId: 50 };
const PAST = { id: 2, ...periodRangeFromDays("2026-03-02", "2026-07-31"), achievementId: 40 };

describe("programa de mentores", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    vi.mocked(auth).mockResolvedValue({ user: { id: "admin1" } } as any);
    vi.mocked(requireMentorAdmin).mockResolvedValue({ userId: "admin1" });
  });

  describe("parseMentorEmails", () => {
    it("debería normalizar, deduplicar y separar correos no institucionales", () => {
      const result = parseMentorEmails(
        " Ana.Perez@yachaytech.edu.ec,ana.perez@yachaytech.edu.ec\nluis@gmail.com; b@yachaytech.edu.ec "
      );
      expect(result.emails).toEqual(["ana.perez@yachaytech.edu.ec", "b@yachaytech.edu.ec"]);
      expect(result.invalid).toEqual(["luis@gmail.com"]);
    });
  });

  describe("getActiveMentorIds", () => {
    it("debería cruzar correos sin distinguir mayúsculas", async () => {
      vi.mocked(db.user.findMany).mockResolvedValue([
        { id: "u1", email: "Ana.Perez@yachaytech.edu.ec" },
        { id: "u2", email: "otro@yachaytech.edu.ec" },
      ] as any);
      vi.mocked(db.mentorAssignment.findMany).mockResolvedValue([
        { email: "ana.perez@yachaytech.edu.ec" },
      ] as any);

      const ids = await getActiveMentorIds(["u1", "u2"]);

      expect(ids).toEqual(new Set(["u1"]));
      expect(db.mentorAssignment.findMany).toHaveBeenCalledWith({
        where: {
          email: { in: ["ana.perez@yachaytech.edu.ec", "otro@yachaytech.edu.ec"] },
          period: { startsAt: { lte: NOW }, endsAt: { gt: NOW } },
        },
        select: { email: true },
      });
    });

    it("no debería consultar la base con una lista vacía", async () => {
      expect(await getActiveMentorIds([])).toEqual(new Set());
      expect(db.user.findMany).not.toHaveBeenCalled();
    });
  });

  describe("resolveSessionPrice", () => {
    const mockMentor = (isMentor: boolean) => {
      vi.mocked(db.user.findMany).mockResolvedValue([
        { id: "tutor1", email: "tutor@yachaytech.edu.ec" },
      ] as any);
      vi.mocked(db.mentorAssignment.findMany).mockResolvedValue(
        (isMentor ? [{ email: "tutor@yachaytech.edu.ec" }] : []) as any
      );
    };

    beforeEach(() => {
      vi.mocked(db.userPricingConfiguration.findFirst).mockResolvedValue({ price: 5 } as any);
    });

    it("debería cobrar 0 a un mentor activo en un curso de nivelación", async () => {
      vi.mocked(db.course.findUnique).mockResolvedValue({ isLeveling: true } as any);
      mockMentor(true);

      const result = await resolveSessionPrice({ tutorId: "tutor1", courseId: 17, duration: 60 });

      expect(result).toEqual({ price: 0 });
    });

    it("debería cobrar el precio del perfil a un mentor en un curso regular", async () => {
      vi.mocked(db.course.findUnique).mockResolvedValue({ isLeveling: false } as any);
      mockMentor(true);

      const result = await resolveSessionPrice({ tutorId: "tutor1", courseId: 1, duration: 60 });

      expect(result).toEqual({ price: 5 });
    });

    it("debería cobrar el precio del perfil a un tutor no mentor en nivelación", async () => {
      vi.mocked(db.course.findUnique).mockResolvedValue({ isLeveling: true } as any);
      mockMentor(false);

      const result = await resolveSessionPrice({ tutorId: "tutor1", courseId: 17, duration: 60 });

      expect(result).toEqual({ price: 5 });
    });

    it("debería rechazar una duración que el mentor no ofrece, aunque sea gratis", async () => {
      vi.mocked(db.userPricingConfiguration.findFirst).mockResolvedValue(null);
      vi.mocked(db.course.findUnique).mockResolvedValue({ isLeveling: true } as any);

      const result = await resolveSessionPrice({ tutorId: "tutor1", courseId: 17, duration: 45 });

      expect(result).toHaveProperty("error");
    });
  });

  describe("requestIndividualSession", () => {
    it("debería guardar la sesión con precio 0 e ignorar el precio enviado por el cliente", async () => {
      vi.mocked(auth).mockResolvedValue({ user: { id: "student1" } } as any);
      vi.mocked(db.userPricingConfiguration.findFirst).mockResolvedValue({ price: 5 } as any);
      vi.mocked(db.course.findUnique).mockResolvedValue({ isLeveling: true } as any);
      vi.mocked(db.user.findMany).mockResolvedValue([
        { id: "tutor1", email: "tutor@yachaytech.edu.ec" },
      ] as any);
      vi.mocked(db.mentorAssignment.findMany).mockResolvedValue([
        { email: "tutor@yachaytech.edu.ec" },
      ] as any);
      vi.mocked(db.user.findUnique).mockResolvedValue(null);

      await requestIndividualSession({
        studentId: "student1",
        tutorId: "tutor1",
        courseId: 17,
        sessionDateTime: "2026-10-27T15:00:00.000Z",
        duration: 60,
        price: 99,
        place: "Biblioteca",
        online: false,
        topic: "Límites y derivadas",
      });

      expect(db.individualSession.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ studentId: "student1", price: 0, status: "requested" }),
      });
    });
  });

  describe("syncMentorAchievements", () => {
    it("debería otorgar solo los logros que faltan de periodos ya iniciados", async () => {
      vi.mocked(db.mentorAssignment.findMany).mockResolvedValue([
        { period: { achievementId: 40 } },
        { period: { achievementId: 50 } },
      ] as any);
      vi.mocked(db.userAchievement.findMany).mockResolvedValue([{ achievementId: 40 }] as any);

      const awarded = await syncMentorAchievements("u1", "Ana@yachaytech.edu.ec");

      expect(db.mentorAssignment.findMany).toHaveBeenCalledWith({
        where: { email: "ana@yachaytech.edu.ec", period: { startsAt: { lte: NOW } } },
        select: { period: { select: { achievementId: true } } },
      });
      expect(awarded).toEqual([50]);
      expect(db.userAchievement.createMany).toHaveBeenCalledWith({
        data: [{ userId: "u1", achievementId: 50 }],
      });
    });
  });

  describe("addMentors", () => {
    it("debería rechazar a un usuario sin rol MENTOR_ADMIN", async () => {
      vi.mocked(requireMentorAdmin).mockRejectedValue(new Error("Unauthorized"));

      const result = await addMentors({ periodId: 1, emails: "a@yachaytech.edu.ec" });

      expect(result).toEqual({ error: "Usuario NO AUTORIZADO" });
      expect(db.mentorAssignment.createMany).not.toHaveBeenCalled();
    });

    it("debería rechazar agregar mentores a un periodo cerrado", async () => {
      vi.mocked(db.academicPeriod.findUnique).mockResolvedValue(PAST as any);

      const result = await addMentors({ periodId: 2, emails: "a@yachaytech.edu.ec" });

      expect(result).toEqual({ error: "No se pueden agregar mentores a periodos anteriores" });
      expect(db.mentorAssignment.createMany).not.toHaveBeenCalled();
    });

    it("debería rechazar correos fuera de @yachaytech.edu.ec", async () => {
      const result = await addMentors({
        periodId: 1,
        emails: "a@yachaytech.edu.ec, b@gmail.com",
      });

      expect(result.error).toContain("b@gmail.com");
      expect(db.mentorAssignment.createMany).not.toHaveBeenCalled();
    });

    it("debería agregar a un periodo vigente y otorgar el logro a quien ya tiene cuenta", async () => {
      vi.mocked(db.academicPeriod.findUnique).mockResolvedValue(CURRENT as any);
      vi.mocked(db.mentorAssignment.createMany).mockResolvedValue({ count: 1 });
      vi.mocked(db.user.findMany).mockResolvedValue([
        { id: "u1", email: "a@yachaytech.edu.ec" },
      ] as any);
      vi.mocked(db.mentorAssignment.findMany).mockResolvedValue([
        { period: { achievementId: 50 } },
      ] as any);
      vi.mocked(db.userAchievement.findMany).mockResolvedValue([]);

      const result = await addMentors({
        periodId: 1,
        emails: "A@yachaytech.edu.ec\nsin.cuenta@yachaytech.edu.ec",
      });

      expect(db.mentorAssignment.createMany).toHaveBeenCalledWith({
        data: [
          { email: "a@yachaytech.edu.ec", periodId: 1, addedById: "admin1" },
          { email: "sin.cuenta@yachaytech.edu.ec", periodId: 1, addedById: "admin1" },
        ],
        skipDuplicates: true,
      });
      expect(db.userAchievement.createMany).toHaveBeenCalledWith({
        data: [{ userId: "u1", achievementId: 50 }],
      });
      expect(result.success).toContain("1 ya estaba");
    });
  });

  describe("removeMentor", () => {
    it("debería rechazar modificar un periodo cerrado", async () => {
      vi.mocked(db.mentorAssignment.findUnique).mockResolvedValue({
        id: 9,
        email: "a@yachaytech.edu.ec",
        period: PAST,
      } as any);

      const result = await removeMentor(9);

      expect(result.error).toBeDefined();
      expect(db.mentorAssignment.delete).not.toHaveBeenCalled();
    });
  });

  describe("createAcademicPeriod", () => {
    it("debería rechazar un periodo que ya terminó", async () => {
      const result = await createAcademicPeriod({
        year: 2026,
        term: "1",
        startsOn: "2026-03-02",
        endsOn: "2026-07-31",
      });

      expect(result).toEqual({ error: "No se pueden crear periodos que ya terminaron" });
      expect(db.$transaction).not.toHaveBeenCalled();
    });

    it("debería rechazar un periodo duplicado", async () => {
      vi.mocked(db.academicPeriod.findMany).mockResolvedValue([
        { year: 2026, term: 2, ...CURRENT },
      ] as any);

      const result = await createAcademicPeriod({
        year: 2026,
        term: "2",
        startsOn: "2027-02-01",
        endsOn: "2027-03-01",
      });

      expect(result).toEqual({ error: "El periodo 2026-II ya existe" });
    });

    it("debería rechazar periodos solapados", async () => {
      vi.mocked(db.academicPeriod.findMany).mockResolvedValue([
        { year: 2026, term: 2, ...CURRENT },
      ] as any);

      const result = await createAcademicPeriod({
        year: 2027,
        term: "1",
        startsOn: "2027-01-15",
        endsOn: "2027-06-30",
      });

      expect(result).toEqual({ error: "Las fechas se solapan con el periodo 2026-II" });
      expect(db.$transaction).not.toHaveBeenCalled();
    });

    it("debería crear el periodo junto con su logro", async () => {
      vi.mocked(db.academicPeriod.findMany).mockResolvedValue([
        { year: 2026, term: 2, ...CURRENT },
      ] as any);
      const tx = {
        achievement: { create: vi.fn().mockResolvedValue({ id: 77 }) },
        academicPeriod: { create: vi.fn() },
      };
      vi.mocked(db.$transaction).mockImplementation(async (fn: any) => fn(tx));

      const result = await createAcademicPeriod({
        year: 2027,
        term: "1",
        startsOn: "2027-03-01",
        endsOn: "2027-07-31",
      });

      expect(result).toEqual({ success: "Periodo 2027-I creado" });
      expect(tx.achievement.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ name: "Mentor 2027-I", tier: "unique" }),
      });
      expect(tx.academicPeriod.create).toHaveBeenCalledWith({
        data: {
          year: 2027,
          term: 1,
          startsAt: new Date("2027-03-01T05:00:00.000Z"),
          endsAt: new Date("2027-08-01T05:00:00.000Z"),
          achievementId: 77,
        },
      });
    });
  });
});

describe("requireMentorAdmin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("debería leer el rol desde la base y rechazar a quien no es MENTOR_ADMIN", async () => {
    const { requireMentorAdmin: realRequireMentorAdmin } =
      await vi.importActual<typeof import("@/lib/admin")>("@/lib/admin");
    vi.mocked(auth).mockResolvedValue({ user: { id: "u1" } } as any);

    vi.mocked(db.user.findUnique).mockResolvedValue({ role: "USER" } as any);
    await expect(realRequireMentorAdmin()).rejects.toThrow("not a mentor admin");

    vi.mocked(db.user.findUnique).mockResolvedValue({ role: "MENTOR_ADMIN" } as any);
    await expect(realRequireMentorAdmin()).resolves.toEqual({ userId: "u1" });
  });
});
