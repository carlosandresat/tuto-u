import { vi, describe, it, expect, beforeEach } from "vitest";
import { addNarcissismAchievement } from "@/actions/session-request";
import { db } from "@/lib/db";

// Mock the global db instance from @/lib/db
vi.mock("@/lib/db", () => {
  return {
    db: {
      userAchievement: {
        findFirst: vi.fn(),
        create: vi.fn(),
      },
    },
  };
});

describe("Server Actions - session-request", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("addNarcissismAchievement", () => {
    it("debería devolver mensaje indicando que ya tiene el logro si ya existe", async () => {
      vi.mocked(db.userAchievement.findFirst).mockResolvedValue({
        id: 1,
        userId: "user123",
        achievementId: 12,
        achievedDate: new Date(),
      } as any);

      const result = await addNarcissismAchievement("user123");

      expect(db.userAchievement.findFirst).toHaveBeenCalledWith({
        where: {
          userId: "user123",
          achievementId: 12,
        },
      });
      expect(db.userAchievement.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        message: "¿Otra vez? Ya te ganaste el logro por intentar esto",
      });
    });

    it("debería crear el logro y devolver el mensaje de éxito si no existe", async () => {
      vi.mocked(db.userAchievement.findFirst).mockResolvedValue(null);
      vi.mocked(db.userAchievement.create).mockResolvedValue({
        id: 2,
        userId: "user123",
        achievementId: 12,
        achievedDate: new Date(),
      } as any);

      const result = await addNarcissismAchievement("user123");

      expect(db.userAchievement.findFirst).toHaveBeenCalledWith({
        where: {
          userId: "user123",
          achievementId: 12,
        },
      });
      expect(db.userAchievement.create).toHaveBeenCalledWith({
        data: {
          userId: "user123",
          achievementId: 12,
        },
      });
      expect(result.message).toContain("Narcisista por Excelencia");
    });

    it("debería devolver un mensaje de error si ocurre una excepción", async () => {
      const mockError = new Error("Database error");
      vi.mocked(db.userAchievement.findFirst).mockRejectedValue(mockError);

      const result = await addNarcissismAchievement("user123");

      expect(result).toEqual({
        error_message: "Hubo un error en el sistema. Contacta con los administradores por favor",
        error: mockError,
      });
    });
  });
});
