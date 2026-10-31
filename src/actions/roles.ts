"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { MentorAdminEmailSchema } from "@/schemas";

async function authorize(): Promise<boolean> {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}

export const grantMentorAdmin = async (data: z.infer<typeof MentorAdminEmailSchema>) => {
  if (!(await authorize())) {
    return { error: "Usuario NO AUTORIZADO" };
  }

  const validatedFields = MentorAdminEmailSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  try {
    // El rol vive en `User`, así que la cuenta tiene que existir.
    const user = await db.user.findFirst({
      where: { email: { equals: validatedFields.data.email, mode: "insensitive" } },
      select: { id: true, role: true },
    });
    if (!user) {
      return { error: "No existe una cuenta con ese correo" };
    }
    if (user.role === "MENTOR_ADMIN") {
      return { error: "Esa cuenta ya es admin de mentores" };
    }

    await db.user.update({ where: { id: user.id }, data: { role: "MENTOR_ADMIN" } });
  } catch (error) {
    console.error("Failed to grant mentor admin role:", error);
    return { error: "Hubo un error en el sistema. Contacta con los administradores por favor" };
  }

  revalidatePath("/admin/roles");
  return { success: "Rol de admin de mentores otorgado" };
};

export const revokeMentorAdmin = async (targetUserId: string) => {
  if (!(await authorize())) {
    return { error: "Usuario NO AUTORIZADO" };
  }

  try {
    const result = await db.user.updateMany({
      where: { id: targetUserId, role: "MENTOR_ADMIN" },
      data: { role: "USER" },
    });
    if (result.count === 0) {
      return { error: "Esa cuenta no es admin de mentores" };
    }
  } catch (error) {
    console.error("Failed to revoke mentor admin role:", error);
    return { error: "Hubo un error en el sistema. Contacta con los administradores por favor" };
  }

  revalidatePath("/admin/roles");
  return { success: "Rol de admin de mentores retirado" };
};
