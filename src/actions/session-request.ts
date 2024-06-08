"use server";

import { db } from "@/lib/db";
import { addHours } from "date-fns";
import { newSessionTutorNotificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAvailableTutors = async (
  courseId: number,
  dayOfWeek: number,
  timeSlot: number
) => {
  try {
    const previousTimeSlot = timeSlot === 0 ? 23 : timeSlot - 1;

    const tutors = await db.tutorCourse.findMany({
      where: {
        courseId: courseId,
        tutor: {
          availabilities: {
            some: {
              OR: [
                { dayOfWeek: dayOfWeek, timeSlot: timeSlot },
                { dayOfWeek: dayOfWeek, timeSlot: previousTimeSlot },
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
            email: true,
            id: true,
            description: true,
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
    return tutors.map((tutorCourse) => ({
      id: tutorCourse.tutor.id,
      email: tutorCourse.tutor.email,
      name: `${tutorCourse.tutor.firstname} ${tutorCourse.tutor.lastname}`,
      nameInitials: `${tutorCourse.tutor.firstname?.charAt(
        0
      )}${tutorCourse.tutor.lastname?.charAt(0)}`,
      pricing: tutorCourse.tutor.tutor_pricing.map((config) => ({
        duration: config.duration,
        price: config.price.toNumber().toFixed(2), // Ensure the price is returned as a number, if necessary
      })),
      description: tutorCourse.tutor.description,
    }));
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
  try {
    await db.individualSession.create({
      data: { ...data, status: "requested" },
    });
    const res = await db.user.findUnique({
      where: {
        id: data.tutorId,
      },
      select: {
        email: true,
        firstname: true,
      },
    });
    if (res?.email){
      await newSessionTutorNotificationEmail(res.email, res.firstname, data.topic, data.sessionDateTime)
    }
  } catch (error) {
    return {
      error_message:
        "Hubo un error en el sistema. Contacta con los administradores por favor",
      error,
    };
  }
  revalidatePath("/home");
  redirect("/home")

};

export const getStudentSessions = async (userId: string) => {
  const aDayAgo = addHours(new Date(), -60);

  try {
    const sessions = await db.individualSession.findMany({
      where: {
        studentId: userId,
        sessionDateTime: {
          gte: aDayAgo,
        },
      },
      include: {
        tutor: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        course: {
          select: {
            name: true,
          },
        },
      },
    });

    return sessions.map((session) => ({
      sessionId: session.id,
      tutorFullname: `${session.tutor.firstname} ${session.tutor.lastname}`,
      tutorInitials: `${session.tutor.firstname?.charAt(
        0
      )}${session.tutor.lastname?.charAt(0)}`,
      tutorEmail: session.tutor.email || "",
      status: session.status,
      sessionCourse: session.course.name,
      rawDateTime: session.sessionDateTime,
      //dateString: capitalizeMonth(session.sessionDateTime.toLocaleDateString('es-ES', {day: '2-digit', month: 'short', year: 'numeric'})),
      //timeString: session.sessionDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      place: session.place || "",
      duration: session.duration,
      price: Number(session.price),
      topic: session.topic,
      rate:
        session.studentRating !== null ? Number(session.studentRating) : null,
    }));
  } catch (error) {
    console.error("Failed to fetch student sessions:", error);
    throw new Error("Unable to fetch student sessions.");
  }
};

export const addNarcissismAchievement = async (id: string) => {
  try {
    const existingAchievement = await db.userAchievement.findFirst({
      where: {
        userId: id,
        achievementId: 12,
      },
    });

    if (existingAchievement) {
      return { message: "¿Otra vez? Ya te ganaste el logro por intentar esto" };
    } else {
      await db.userAchievement.create({
        data: {
          userId: id,
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
