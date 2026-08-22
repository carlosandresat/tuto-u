import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/lib/db", () => {
  return {
    db: {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
    },
  };
});

vi.mock("@/auth", () => ({
  signIn: vi.fn(),
}));

// login.ts importa AuthError directamente del paquete next-auth (no de
// @/auth). El paquete real carga next/server internamente, que no existe
// bajo el entorno "node" de vitest -- se mockea con una clase mínima que
// preserva el `instanceof` que login.ts usa en su catch.
vi.mock("next-auth", () => {
  class AuthError extends Error {
    type: string;
    constructor(type: string) {
      super(type);
      this.type = type;
    }
  }
  return { AuthError };
});

vi.mock("@/lib/user-identity", () => ({
  resolveUserIdentity: vi.fn(),
}));

vi.mock("@/lib/verification-code", () => ({
  issueVerificationCode: vi.fn(),
  verifyVerificationCode: vi.fn(),
}));

vi.mock("@/lib/mail", () => ({
  sendVerificationCodeEmail: vi.fn(),
}));

vi.mock("@/lib/verification-cookie", () => ({
  setPendingVerificationEmail: vi.fn(),
  getPendingVerificationEmail: vi.fn(),
  clearPendingVerificationEmail: vi.fn(),
}));

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { resolveUserIdentity } from "@/lib/user-identity";
import { issueVerificationCode } from "@/lib/verification-code";
import { sendVerificationCodeEmail } from "@/lib/mail";
import { setPendingVerificationEmail } from "@/lib/verification-cookie";
import { login, register } from "@/actions/login";

const YACHAY_EMAIL = "juan.perez@yachaytech.edu.ec";

describe("actions/login - verificación de correo", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.EMAIL_VERIFICATION_ENFORCED = "true";
  });

  describe("login", () => {
    it("debería enviar un código y devolver verificationRequired cuando la contraseña es correcta y la cuenta no está verificada", async () => {
      const passwordHash = await bcrypt.hash("password123", 10);
      vi.mocked(db.user.findUnique).mockResolvedValue({
        id: "u1",
        email: YACHAY_EMAIL,
        firstname: "Juan",
        password: passwordHash,
        emailVerified: null,
      } as any);
      vi.mocked(issueVerificationCode).mockResolvedValue({
        ok: true,
        code: "123456",
        expires: new Date(),
      });

      const result = await login({ email: YACHAY_EMAIL, password: "password123" });

      expect(result).toEqual({
        verificationRequired: true,
        success: "Debes verificar tu correo. Te enviamos un código de 6 dígitos.",
      });
      expect(setPendingVerificationEmail).toHaveBeenCalledWith(YACHAY_EMAIL);
      expect(sendVerificationCodeEmail).toHaveBeenCalledTimes(1);
      expect(sendVerificationCodeEmail).toHaveBeenCalledWith(YACHAY_EMAIL, "123456", "Juan");
      expect(signIn).not.toHaveBeenCalled();
    });

    it("NO debería enviar ningún código ni fijar la cookie cuando la contraseña es incorrecta, aunque la cuenta no esté verificada", async () => {
      // Esta es la prueba de regresión más importante del cambio: sin el
      // orden correcto de chequeos, este endpoint sería un oráculo de
      // enumeración de correos Y una bomba de correo (cualquiera podría
      // hacer POST con un correo ajeno y forzar el envío de un código).
      const passwordHash = await bcrypt.hash("la-contraseña-correcta", 10);
      vi.mocked(db.user.findUnique).mockResolvedValue({
        id: "u1",
        email: YACHAY_EMAIL,
        firstname: "Juan",
        password: passwordHash,
        emailVerified: null,
      } as any);

      await login({ email: YACHAY_EMAIL, password: "contraseña-incorrecta" });

      expect(issueVerificationCode).not.toHaveBeenCalled();
      expect(sendVerificationCodeEmail).not.toHaveBeenCalled();
      expect(setPendingVerificationEmail).not.toHaveBeenCalled();
      // La contraseña incorrecta cae al flujo normal de signIn, que
      // authorize() rechazará con el mismo mensaje genérico que una cuenta
      // inexistente -- sin revelar que el correo sí existe pero no está
      // verificado.
      expect(signIn).toHaveBeenCalledTimes(1);
    });

    it("NO debería enviar ningún código cuando el correo no está registrado", async () => {
      vi.mocked(db.user.findUnique).mockResolvedValue(null);

      await login({ email: "nadie@yachaytech.edu.ec", password: "cualquiera" });

      expect(issueVerificationCode).not.toHaveBeenCalled();
      expect(sendVerificationCodeEmail).not.toHaveBeenCalled();
      expect(setPendingVerificationEmail).not.toHaveBeenCalled();
      expect(signIn).toHaveBeenCalledTimes(1);
    });

    it("debería ir directo a signIn cuando la cuenta ya está verificada", async () => {
      const passwordHash = await bcrypt.hash("password123", 10);
      vi.mocked(db.user.findUnique).mockResolvedValue({
        id: "u1",
        email: YACHAY_EMAIL,
        firstname: "Juan",
        password: passwordHash,
        emailVerified: new Date(),
      } as any);

      await login({ email: YACHAY_EMAIL, password: "password123" });

      expect(issueVerificationCode).not.toHaveBeenCalled();
      expect(signIn).toHaveBeenCalledTimes(1);
    });

    it("debería omitir el chequeo de verificación cuando EMAIL_VERIFICATION_ENFORCED es false", async () => {
      process.env.EMAIL_VERIFICATION_ENFORCED = "false";

      await login({ email: YACHAY_EMAIL, password: "password123" });

      expect(db.user.findUnique).not.toHaveBeenCalled();
      expect(signIn).toHaveBeenCalledTimes(1);
    });
  });

  describe("register", () => {
    it('debería devolver un mensaje distinto de "Email ya registrado" cuando el envío del código de verificación falla', async () => {
      vi.mocked(db.user.findUnique).mockResolvedValue(null);
      vi.mocked(resolveUserIdentity).mockResolvedValue({
        universityId: "uni1",
        username: "juan.perez",
      });
      vi.mocked(db.user.create).mockResolvedValue({} as any);
      vi.mocked(issueVerificationCode).mockResolvedValue({
        ok: true,
        code: "123456",
        expires: new Date(),
      });
      vi.mocked(sendVerificationCodeEmail).mockRejectedValue(new Error("Resend caído"));

      const result = await register({
        firstname: "Juan",
        lastname: "Perez",
        email: YACHAY_EMAIL,
        password: "password123",
      });

      expect(result.error).toBeUndefined();
      expect(result.message).not.toBe("Email ya registrado");
      expect(result).toMatchObject({ verificationRequired: true });
    });

    it("debería crear la cuenta y devolver verificationRequired en el camino feliz", async () => {
      vi.mocked(db.user.findUnique).mockResolvedValue(null);
      vi.mocked(resolveUserIdentity).mockResolvedValue({
        universityId: "uni1",
        username: "juan.perez",
      });
      vi.mocked(db.user.create).mockResolvedValue({} as any);
      vi.mocked(issueVerificationCode).mockResolvedValue({
        ok: true,
        code: "123456",
        expires: new Date(),
      });

      const result = await register({
        firstname: "Juan",
        lastname: "Perez",
        email: YACHAY_EMAIL,
        password: "password123",
      });

      expect(result).toEqual({
        verificationRequired: true,
        message: "Registro realizado con éxito. Te enviamos un código de 6 dígitos.",
      });
      expect(sendVerificationCodeEmail).toHaveBeenCalledWith(YACHAY_EMAIL, "123456", "Juan");
    });

    it('debería devolver "Email ya registrado" cuando el correo ya existe, sin llamar a create', async () => {
      vi.mocked(db.user.findUnique).mockResolvedValue({ id: "existing" } as any);

      const result = await register({
        firstname: "Juan",
        lastname: "Perez",
        email: YACHAY_EMAIL,
        password: "password123",
      });

      expect(result).toEqual({ error: "Email ya registrado" });
      expect(db.user.create).not.toHaveBeenCalled();
      expect(sendVerificationCodeEmail).not.toHaveBeenCalled();
    });
  });
});
