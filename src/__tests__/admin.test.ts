import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { requireAdmin, isCurrentUserAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { auth } from "@/auth";

vi.mock("@/lib/db", () => {
  return {
    db: {
      user: {
        findUnique: vi.fn(),
      },
    },
  };
});

vi.mock("@/auth", () => {
  return {
    auth: vi.fn(),
  };
});

describe("lib/admin", () => {
  const originalAdminEmails = process.env.ADMIN_EMAILS;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    process.env.ADMIN_EMAILS = originalAdminEmails;
  });

  describe("requireAdmin", () => {
    it("debería resolver cuando el correo del usuario está en la lista de administradores", async () => {
      process.env.ADMIN_EMAILS = "Admin@Yachaytech.edu.ec, otro@yachaytech.edu.ec";
      vi.mocked(auth).mockResolvedValue({ user: { id: "user123" } } as any);
      vi.mocked(db.user.findUnique).mockResolvedValue({
        email: "admin@yachaytech.edu.ec",
      } as any);

      const result = await requireAdmin();

      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { id: "user123" },
        select: { email: true },
      });
      expect(result).toEqual({ userId: "user123", email: "admin@yachaytech.edu.ec" });
    });

    it("debería rechazar cuando el correo del usuario no está en la lista de administradores", async () => {
      process.env.ADMIN_EMAILS = "admin@yachaytech.edu.ec";
      vi.mocked(auth).mockResolvedValue({ user: { id: "user123" } } as any);
      vi.mocked(db.user.findUnique).mockResolvedValue({
        email: "estudiante@yachaytech.edu.ec",
      } as any);

      await expect(requireAdmin()).rejects.toThrow();
    });

    it("debería rechazar cuando no hay una sesión activa", async () => {
      process.env.ADMIN_EMAILS = "admin@yachaytech.edu.ec";
      vi.mocked(auth).mockResolvedValue(null as any);

      await expect(requireAdmin()).rejects.toThrow();
      expect(db.user.findUnique).not.toHaveBeenCalled();
    });

    it("debería rechazar a todos cuando ADMIN_EMAILS está vacío o no definido", async () => {
      process.env.ADMIN_EMAILS = "";
      vi.mocked(auth).mockResolvedValue({ user: { id: "user123" } } as any);
      vi.mocked(db.user.findUnique).mockResolvedValue({
        email: "admin@yachaytech.edu.ec",
      } as any);

      await expect(requireAdmin()).rejects.toThrow();
    });
  });

  describe("isCurrentUserAdmin", () => {
    it("debería devolver true para un administrador válido", async () => {
      process.env.ADMIN_EMAILS = "admin@yachaytech.edu.ec";
      vi.mocked(auth).mockResolvedValue({ user: { id: "user123" } } as any);
      vi.mocked(db.user.findUnique).mockResolvedValue({
        email: "admin@yachaytech.edu.ec",
      } as any);

      await expect(isCurrentUserAdmin()).resolves.toBe(true);
    });

    it("debería devolver false en lugar de lanzar una excepción cuando no es administrador", async () => {
      process.env.ADMIN_EMAILS = "admin@yachaytech.edu.ec";
      vi.mocked(auth).mockResolvedValue(null as any);

      await expect(isCurrentUserAdmin()).resolves.toBe(false);
    });
  });
});
