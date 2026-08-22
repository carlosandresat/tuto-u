"use server";

import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import { resolveUserIdentity } from "@/lib/user-identity";
import { issueVerificationCode } from "@/lib/verification-code";
import { sendVerificationCodeEmail } from "@/lib/mail";
import { setPendingVerificationEmail } from "@/lib/verification-cookie";

const verificationEnforced = () => process.env.EMAIL_VERIFICATION_ENFORCED !== "false";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "¡Campos inválidos!" };
  }

  const { email, password } = validatedFields.data;

  if (verificationEnforced()) {
    const existingUser = await db.user.findUnique({ where: { email } });

    // ORDEN CRÍTICO: la contraseña se verifica ANTES de revelar nada o de
    // enviar ningún correo. Sin esto este endpoint sería un oráculo de
    // enumeración de correos Y una bomba de correo (cualquiera podría hacer
    // POST con direcciones arbitrarias y forzarnos a mandarles un email).
    // Esto duplica el bcrypt.compare de authorize() (src/auth.config.ts) a
    // propósito: Auth.js v5 beta colapsa cualquier fallo de authorize() en
    // "CredentialsSignin" sin forma confiable de sacar "no verificado" de ahí.
    if (existingUser?.password && !existingUser.emailVerified) {
      const passwordsMatch = await bcrypt.compare(password, existingUser.password);
      if (passwordsMatch) {
        await setPendingVerificationEmail(email);
        const issued = await issueVerificationCode(email);
        if (issued.ok) {
          try {
            await sendVerificationCodeEmail(
              email,
              issued.code,
              existingUser.firstname || "Estudiante"
            );
          } catch {
            // El correo pudo no llegar, pero el código ya quedó guardado y la
            // página de verificación ofrece reenviarlo.
          }
        }
        // Una contraseña incorrecta contra una cuenta sin verificar NO entra
        // a este bloque: cae directo a signIn() de abajo, authorize() devuelve
        // null, y el usuario ve "¡Credenciales inválidas!" -- idéntico a una
        // cuenta inexistente. No se envía ningún código en ese caso.
        return {
          verificationRequired: true,
          success: "Debes verificar tu correo. Te enviamos un código de 6 dígitos.",
        };
      }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "¡Credenciales inválidas!" };
        default:
          return { error: "¡Algo está mal!" };
      }
    }
    throw error;
  }
};

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { firstname, lastname, password, email } = validatedFields.data;

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email ya registrado" };
  }

  const identity = await resolveUserIdentity(email);

  if (!identity) {
    return { error: "Dominio de correo no permitido" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        username: identity.username,
        universityId: identity.universityId,
      },
    });
  } catch (error) {
    // El try/catch cubre SOLO la escritura, no todo el flujo: así un fallo de
    // envío de correo (más abajo) no se reporta como "Email ya registrado".
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Email ya registrado" }; // carrera real con otro registro
    }
    return { error: "No se pudo completar el registro. Inténtalo de nuevo." };
  }

  if (!verificationEnforced()) {
    return { message: "Registro realizado con éxito" };
  }

  await setPendingVerificationEmail(email);

  const issued = await issueVerificationCode(email);
  if (issued.ok) {
    try {
      await sendVerificationCodeEmail(email, issued.code, firstname);
    } catch {
      return {
        verificationRequired: true,
        message:
          'Cuenta creada, pero no pudimos enviar el código. Usa "Reenviar código".',
      };
    }
  }

  return {
    verificationRequired: true,
    message: "Registro realizado con éxito. Te enviamos un código de 6 dígitos.",
  };
};
