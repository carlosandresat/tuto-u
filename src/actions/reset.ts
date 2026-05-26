"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { db } from "@/lib/db";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { headers } from "next/headers";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Correo inválido" };
  }

  const { email } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    // Return success to prevent email enumeration, but with a Spanish generic success message
    return { success: "Se ha enviado un correo de recuperación si la dirección está registrada." };
  }

  const userName = existingUser.firstname || "Estudiante";
  const passwordResetToken = await generatePasswordResetToken(email);

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;

  try {
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
      userName,
      domain
    );
  } catch (error) {
    return { error: "Hubo un error al enviar el correo. Por favor inténtalo de nuevo." };
  }

  return { success: "¡Correo de recuperación enviado con éxito!" };
};
