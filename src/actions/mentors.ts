"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireMentorAdmin } from "@/lib/admin";
import {
  getPeriodStatus,
  isPeriodClosed,
  periodLabel,
  periodRangeFromDays,
  rangesOverlap,
} from "@/lib/academic-period";
import { parseMentorEmails, syncMentorAchievementsForEmails } from "@/lib/mentors";
import { AcademicPeriodSchema, MentorEmailsSchema } from "@/schemas";

// La identidad y el permiso salen SIEMPRE de requireMentorAdmin() (auth() + rol
// leído de la BD); ninguna acción acepta un userId del cliente.
async function authorize(): Promise<{ userId: string } | null> {
  try {
    return await requireMentorAdmin();
  } catch {
    return null;
  }
}

export const createAcademicPeriod = async (data: z.infer<typeof AcademicPeriodSchema>) => {
  const admin = await authorize();
  if (!admin) {
    return { error: "Usuario NO AUTORIZADO" };
  }

  const validatedFields = AcademicPeriodSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { year, startsOn, endsOn } = validatedFields.data;
  const term = Number(validatedFields.data.term);
  const range = periodRangeFromDays(startsOn, endsOn);
  const now = new Date();
  const label = periodLabel({ year, term });

  if (year < now.getUTCFullYear() - 1) {
    return { error: "No se pueden crear periodos de años anteriores" };
  }
  if (isPeriodClosed(range, now)) {
    return { error: "No se pueden crear periodos que ya terminaron" };
  }

  try {
    const existing = await db.academicPeriod.findMany({
      select: { year: true, term: true, startsAt: true, endsAt: true },
    });
    if (existing.some((p) => p.year === year && p.term === term)) {
      return { error: `El periodo ${label} ya existe` };
    }
    const overlapping = existing.find((p) => rangesOverlap(p, range));
    if (overlapping) {
      return { error: `Las fechas se solapan con el periodo ${periodLabel(overlapping)}` };
    }

    // Periodo y logro nacen juntos: un periodo sin logro no podría otorgarse.
    await db.$transaction(async (tx) => {
      const achievement = await tx.achievement.create({
        data: {
          name: `Mentor ${label}`,
          description: `Fuiste designado Mentor Yachay Tech en el periodo ${label}.`,
          // Tiers en minúsculas, como los lee achievement-card.tsx.
          tier: "unique",
          // Ícono monocromo (negro sobre transparente) como el resto de
          // public/achievements; `true` = negro en modo claro, blanco en oscuro.
          imageUrl: "mentor.png",
          isInverted: true,
        },
      });
      await tx.academicPeriod.create({
        data: { year, term, ...range, achievementId: achievement.id },
      });
    });
  } catch (error) {
    console.error("Failed to create academic period:", error);
    return { error: "Hubo un error en el sistema. Contacta con los administradores por favor" };
  }

  revalidatePath("/mentors");
  return { success: `Periodo ${label} creado` };
};

export const deleteAcademicPeriod = async (periodId: number) => {
  const admin = await authorize();
  if (!admin) {
    return { error: "Usuario NO AUTORIZADO" };
  }

  try {
    const period = await db.academicPeriod.findUnique({
      where: { id: periodId },
      include: { _count: { select: { mentors: true } } },
    });
    if (!period) {
      return { error: "El periodo no existe" };
    }
    // Un periodo iniciado ya pudo otorgar su logro: borrarlo reescribiría historia.
    if (getPeriodStatus(period) !== "future") {
      return { error: "Solo se pueden eliminar periodos que aún no empiezan" };
    }
    if (period._count.mentors > 0) {
      return { error: "Quita primero a los mentores de este periodo" };
    }

    await db.$transaction([
      db.academicPeriod.delete({ where: { id: periodId } }),
      db.achievement.delete({ where: { id: period.achievementId } }),
    ]);
  } catch (error) {
    console.error("Failed to delete academic period:", error);
    return { error: "Hubo un error en el sistema. Contacta con los administradores por favor" };
  }

  revalidatePath("/mentors");
  return { success: "Periodo eliminado" };
};

export const addMentors = async (data: z.infer<typeof MentorEmailsSchema>) => {
  const admin = await authorize();
  if (!admin) {
    return { error: "Usuario NO AUTORIZADO" };
  }

  const validatedFields = MentorEmailsSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { periodId } = validatedFields.data;
  const { emails, invalid } = parseMentorEmails(validatedFields.data.emails);

  if (invalid.length > 0) {
    return {
      error: `Estos correos no son institucionales (@yachaytech.edu.ec): ${invalid.join(", ")}`,
    };
  }
  if (emails.length === 0) {
    return { error: "Ingresa al menos un correo" };
  }

  let added = 0;
  try {
    const period = await db.academicPeriod.findUnique({ where: { id: periodId } });
    if (!period) {
      return { error: "El periodo no existe" };
    }
    const now = new Date();
    if (isPeriodClosed(period, now)) {
      return { error: "No se pueden agregar mentores a periodos anteriores" };
    }

    const result = await db.mentorAssignment.createMany({
      data: emails.map((email) => ({ email, periodId, addedById: admin.userId })),
      skipDuplicates: true,
    });
    added = result.count;

    // Periodo vigente: el logro se otorga ya a quienes tienen cuenta. Para un
    // periodo futuro se otorga al iniciar (ver syncMentorAchievements).
    if (getPeriodStatus(period, now) === "current") {
      await syncMentorAchievementsForEmails(emails, now);
    }
  } catch (error) {
    console.error("Failed to add mentors:", error);
    return { error: "Hubo un error en el sistema. Contacta con los administradores por favor" };
  }

  revalidatePath("/mentors");
  const skipped = emails.length - added;
  return {
    success:
      skipped > 0
        ? `${added} mentor(es) agregado(s); ${skipped} ya estaba(n) en la lista`
        : `${added} mentor(es) agregado(s)`,
  };
};

export const removeMentor = async (assignmentId: number) => {
  const admin = await authorize();
  if (!admin) {
    return { error: "Usuario NO AUTORIZADO" };
  }

  try {
    const assignment = await db.mentorAssignment.findUnique({
      where: { id: assignmentId },
      include: { period: true },
    });
    if (!assignment) {
      return { error: "La designación no existe" };
    }
    const now = new Date();
    if (isPeriodClosed(assignment.period, now)) {
      return { error: "No se pueden modificar mentores de periodos anteriores" };
    }

    // Si el periodo ya empezó, el logro se ganó aunque la persona aún no haya
    // abierto sus logros (la sincronización es perezosa): se otorga antes de
    // quitarla, y se conserva.
    if (getPeriodStatus(assignment.period, now) === "current") {
      await syncMentorAchievementsForEmails([assignment.email], now);
    }

    await db.mentorAssignment.delete({ where: { id: assignmentId } });
  } catch (error) {
    console.error("Failed to remove mentor:", error);
    return { error: "Hubo un error en el sistema. Contacta con los administradores por favor" };
  }

  revalidatePath("/mentors");
  return { success: "Mentor retirado del periodo" };
};
