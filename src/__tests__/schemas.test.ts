import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  LoginSchema,
  RegisterSchema,
  IndividualSessionRequestSchema,
  ProfileSessionRequestSchema,
} from "@/schemas/index";

describe("Schemas de Validación", () => {
  describe("LoginSchema", () => {
    it("debería aceptar un correo válido de Yachay Tech", () => {
      const result = LoginSchema.safeParse({
        email: "juan.perez@yachaytech.edu.ec",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("debería rechazar correos que no sean de Yachay Tech", () => {
      const result = LoginSchema.safeParse({
        email: "juan.perez@gmail.com",
        password: "password123",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          "El correo debe terminar con @yachaytech.edu.ec"
        );
      }
    });

    it("debería rechazar si la contraseña está vacía", () => {
      const result = LoginSchema.safeParse({
        email: "juan.perez@yachaytech.edu.ec",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("RegisterSchema", () => {
    it("debería aceptar un registro válido", () => {
      const result = RegisterSchema.safeParse({
        firstname: "Juan",
        lastname: "Perez",
        email: "juan.perez@yachaytech.edu.ec",
        password: "securepassword",
      });
      expect(result.success).toBe(true);
    });

    it("debería rechazar nombres muy cortos o largos", () => {
      const resultShort = RegisterSchema.safeParse({
        firstname: "Ju",
        lastname: "Perez",
        email: "juan.perez@yachaytech.edu.ec",
        password: "securepassword",
      });
      expect(resultShort.success).toBe(false);

      const resultLong = RegisterSchema.safeParse({
        firstname: "JuanJuanJuanJuanJuanJuanJuan",
        lastname: "Perez",
        email: "juan.perez@yachaytech.edu.ec",
        password: "securepassword",
      });
      expect(resultLong.success).toBe(false);
    });

    it("debería rechazar contraseñas fuera del rango de 8 a 16 caracteres", () => {
      const resultShort = RegisterSchema.safeParse({
        firstname: "Juan",
        lastname: "Perez",
        email: "juan.perez@yachaytech.edu.ec",
        password: "short",
      });
      expect(resultShort.success).toBe(false);

      const resultLong = RegisterSchema.safeParse({
        firstname: "Juan",
        lastname: "Perez",
        email: "juan.perez@yachaytech.edu.ec",
        password: "contrasenademasiadolargaparaelregistro",
      });
      expect(resultLong.success).toBe(false);
    });
  });

  describe("IndividualSessionRequestSchema", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("debería fallar si la tutoría se solicita para hoy con menos de 8 horas de anticipación", () => {
      // Configuramos el sistema a las 10:00 AM local del 30 de Mayo de 2026
      const systemTime = new Date("2026-05-30T10:00:00");
      vi.setSystemTime(systemTime);

      const result = IndividualSessionRequestSchema.safeParse({
        date: new Date("2026-05-30T00:00:00"), // Hoy
        course: "Física 2",
        time: "17:00", // 17:00 es 7 horas después de las 10:00 -> Debería fallar
        tutor: "tutor_id_123",
        duration: "60",
        topic: "Leyes de Newton",
        place: "Biblioteca",
        isOnline: false,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some(e => e.message === "Debes solicitar la tutoría con 8 horas de anticipación")).toBe(true);
      }
    });

    it("debería pasar si la tutoría se solicita para hoy con más de 8 horas de anticipación", () => {
      // Configuramos el sistema a las 10:00 AM del 30 de Mayo de 2026
      const systemTime = new Date("2026-05-30T10:00:00");
      vi.setSystemTime(systemTime);

      const result = IndividualSessionRequestSchema.safeParse({
        date: new Date("2026-05-30T00:00:00"), // Hoy
        course: "Física 2",
        time: "19:00", // 19:00 es 9 horas después de las 10:00 -> Debería pasar
        tutor: "tutor_id_123",
        duration: "60",
        topic: "Leyes de Newton",
        place: "Biblioteca",
        isOnline: false,
      });

      expect(result.success).toBe(true);
    });

    it("debería pasar si la tutoría se solicita para una fecha posterior", () => {
      // Configuramos el sistema a las 10:00 AM del 30 de Mayo de 2026
      const systemTime = new Date("2026-05-30T10:00:00");
      vi.setSystemTime(systemTime);

      const result = IndividualSessionRequestSchema.safeParse({
        date: new Date("2026-05-31T00:00:00"), // Mañana
        course: "Física 2",
        time: "10:00", // La misma hora, pero de mañana -> Debería pasar
        tutor: "tutor_id_123",
        duration: "60",
        topic: "Leyes de Newton",
        place: "Biblioteca",
        isOnline: false,
      });

      expect(result.success).toBe(true);
    });
  });
});
