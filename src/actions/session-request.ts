"use server";

import { db } from "@/lib/db";
import { newSessionTutorNotificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { IndividualSessionActionSchema } from "@/schemas";
import { getActiveMentorIds, resolveSessionPrice } from "@/lib/mentors";

export const getAvailableTutors = async (
  courseId: number,
  dayOfWeek: number,
  timeSlot: number
) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }

  try {
    const previousTimeSlot = timeSlot === 0 ? 23 : timeSlot - 1;
    const previousDayOfWeek = timeSlot === 0 ? (dayOfWeek - 1 + 7) % 7 : dayOfWeek;

    const tutors = await db.tutorCourse.findMany({
      where: {
        courseId: courseId,
        tutor: {
          availabilities: {
            some: {
              OR: [
                { dayOfWeek: dayOfWeek, timeSlot: timeSlot },
                { dayOfWeek: previousDayOfWeek, timeSlot: previousTimeSlot },
              ],
            },
          },
        },
      },
      select: {
        tutorId: true,
        tutor: {
          select: {
            firstname: true,
            lastname: true,
            id: true,
            description: true,
            image: true,
            tutor_pricing: {
              select: {
                duration: true,
                price: true,
              },
            },
          },
        },
      },
    });
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: { isLeveling: true },
    });
    const mentorIds = await getActiveMentorIds(tutors.map((t) => t.tutor.id));

    return tutors.map((tutorCourse) => {
      const isMentor = mentorIds.has(tutorCourse.tutor.id);
      // Solo informativo: el precio real lo vuelve a decidir resolveSessionPrice
      // al crear la sesión.
      const isFree = isMentor && !!course?.isLeveling;
      return {
        id: tutorCourse.tutor.id,
        name: `${tutorCourse.tutor.firstname} ${tutorCourse.tutor.lastname}`,
        nameInitials: `${tutorCourse.tutor.firstname?.charAt(
          0
        )}${tutorCourse.tutor.lastname?.charAt(0)}`,
        image: tutorCourse.tutor.image,
        pricing: tutorCourse.tutor.tutor_pricing.map((config) => ({
          duration: config.duration,
          price: isFree ? "0.00" : config.price.toNumber().toFixed(2), // Ensure the price is returned as a number, if necessary
        })),
        description: tutorCourse.tutor.description,
        isMentor,
      };
    });
  } catch (error) {
    console.error("Failed to fetch available tutors:", error);
    throw new Error("Unable to fetch available tutors.");
  }
};

export const requestIndividualSession = async (data: {
  studentId: string;
  tutorId: string;
  courseId: number;
  sessionDateTime: string;
  duration: number;
  price: number;
  place: string;
  online: boolean;
  topic: string;
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {error: "Usuario NO AUTORIZADO"}
  }

  const currentUserId = session.user.id;
  const validatedFields = IndividualSessionActionSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error_message: "Campos Inválidos"};
  }

  const { tutorId, courseId, sessionDateTime, duration, place, online,
    topic  } = validatedFields.data;
  try {
    // El precio lo decide el servidor (regla de mentores incluida); el `price`
    // que manda el cliente se ignora a propósito.
    const pricing = await resolveSessionPrice({ tutorId, courseId, duration });

    if ("error" in pricing) {
      return { error_message: pricing.error };
    }

    await db.individualSession.create({
      data: { studentId: currentUserId,
        tutorId,
        courseId,
        sessionDateTime,
        duration,
        place,
        online,
        topic,
        price: pricing.price,
         status: "requested" },
    });
    const res = await db.user.findUnique({
      where: {
        id: tutorId,
      },
      select: {
        email: true,
        firstname: true,
      },
    });
    if (res?.email) {
      await newSessionTutorNotificationEmail(
        res.email,
        res.firstname,
        topic,
        sessionDateTime
      );
    }
  } catch (error) {
    return {
      error_message:
        "Hubo un error en el sistema. Contacta con los administradores por favor",
      error,
    };
  }
  revalidatePath("/home");
  redirect("/home");
};

export const addNarcissismAchievement = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }
  const currentUserId = session.user.id;
  try {
    const existingAchievement = await db.userAchievement.findFirst({
      where: {
        userId: currentUserId,
        achievementId: 12,
      },
    });

    if (existingAchievement) {
      return { message: "¿Otra vez? Ya te ganaste el logro por intentar esto" };
    } else {
      await db.userAchievement.create({
        data: {
          userId: currentUserId,
          achievementId: 12,
        },
      });
      return {
        message:
          "¿Enserio intentaste eso? ¿Solicitarte a ti mismo? Acabas de ganar el logro 'Narcisista por Excelencia'. Revísalo en tu perfil",
      };
    }
  } catch (error) {
    return {
      error_message:
        "Hubo un error en el sistema. Contacta con los administradores por favor",
      error,
    };
  }
};
