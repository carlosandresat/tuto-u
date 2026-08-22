"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { VerificationCodeSchema } from "@/schemas";
import { db } from "@/lib/db";
import { issueVerificationCode, verifyVerificationCode } from "@/lib/verification-code";
import { sendVerificationCodeEmail } from "@/lib/mail";
import {
  clearPendingVerificationEmail,
  getPendingVerificationEmail,
} from "@/lib/verification-cookie";

const NO_PENDING_EMAIL_ERROR = "Tu sesión de verificación expiró. Vuelve a iniciar sesión.";

export const verifyEmailCode = async (values: z.infer<typeof VerificationCodeSchema>) => {
  const validatedFields = VerificationCodeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Código inválido" };
  }

  const email = await getPendingVerificationEmail();
  if (!email) {
    return { error: NO_PENDING_EMAIL_ERROR };
  }

  const result = await verifyVerificationCode(email, validatedFields.data.code);

  switch (result.status) {
    case "no_code":
      return { error: "No hay un código activo. Solicita uno nuevo." };
    case "expired":
      return { error: "El código expiró. Solicita uno nuevo." };
    case "too_many_attempts":
      return { error: "Demasiados intentos fallidos. Solicita un código nuevo." };
    case "invalid":
      return { error: `Código incorrecto. Te quedan ${result.remaining} intentos.` };
    case "ok":
      await clearPendingVerificationEmail();
      revalidatePath("/auth/login");
      return { success: "¡Correo verificado! Ya puedes iniciar sesión." };
  }
};

export const resendVerificationCode = async () => {
  // No recibe ningún argumento -- lee el correo de la cookie httpOnly, que
  // solo pudo haberse fijado tras un bcrypt.compare exitoso en login() o al
  // crear la cuenta en register() (src/actions/login.ts). Por eso, a
  // diferencia de reset.ts:25, esta acción NO necesita fingir éxito para
  // evitar enumeración: no hay nada que un atacante pueda sondear aquí.
  const email = await getPendingVerificationEmail();
  if (!email) {
    return { error: NO_PENDING_EMAIL_ERROR };
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || user.emailVerified) {
    await clearPendingVerificationEmail();
    return { error: "Vuelve a iniciar sesión." };
  }

  const issued = await issueVerificationCode(email);

  if (!issued.ok) {
    if (issued.reason === "cooldown") {
      return {
        error: `Espera ${issued.retryAfterSeconds} segundos antes de solicitar otro código.`,
      };
    }
    return { error: "Has solicitado demasiados códigos. Inténtalo más tarde." };
  }

  try {
    await sendVerificationCodeEmail(email, issued.code, user.firstname || "Estudiante");
  } catch {
    return { error: "Hubo un error al enviar el correo. Por favor inténtalo de nuevo." };
  }

  return { success: "Te enviamos un nuevo código." };
};
