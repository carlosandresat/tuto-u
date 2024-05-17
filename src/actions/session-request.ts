"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { addHours } from "date-fns";

import {
  UserPricingSchema,
  UserCoursesSchema,
  UserAvailabilitySchema,
} from "@/schemas";

export const getAvailableTutors = async (
  courseId: number,
  dayOfWeek: number,
  timeSlot: number
) => {
  try {
    const tutors = await db.tutorCourse.findMany({
      where: {
        courseId: courseId,
        tutor: {
          availabilities: {
            some: {
              OR: [
                { dayOfWeek: dayOfWeek, timeSlot: timeSlot },
                { dayOfWeek: dayOfWeek, timeSlot: timeSlot - 1 },
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
    return tutors.map(tutorCourse => ({
        id: tutorCourse.tutor.id,
        email: tutorCourse.tutor.email,
        name: `${tutorCourse.tutor.firstname} ${tutorCourse.tutor.lastname}`,
        nameInitials:  `${tutorCourse.tutor.firstname?.charAt(0)}${tutorCourse.tutor.lastname?.charAt(0)}`,
        pricing: tutorCourse.tutor.tutor_pricing.map(config => ({
          duration: config.duration,
          price: config.price.toNumber().toFixed(2) // Ensure the price is returned as a number, if necessary
        }))
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
  place: string | null | undefined;
  online: boolean;
  topic: string;
}) => {
  try {
    await db.individualSession.create({
      data: {...data, status: "requested"}
    })
    return {message: "¡Sesión registrada con éxito!"}
  } catch (error) {
    return {error_message: "Hubo un error en el sistema. Contacta con los administradores por favor", error}
  }
};

function capitalizeMonth(dateStr:string) {
  return dateStr.replace(/(\d+)\s([a-z]+)\s(\d+)/i, (match, day, month, year) => {
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
  });
}

export const getStudentSessions = async (userId:string) => {
  const aDayAgo = addHours(new Date(), -24)

  try {
    const sessions = await db.individualSession.findMany({
      where: {
        studentId: userId,
        sessionDateTime: {
          gte: aDayAgo
        }
      },
      include: {
        tutor: {
          select: {
            firstname: true,
            lastname: true,
            email: true
          }
        },
        course: {
          select: {
            name: true
          }
        }
      }
    });

    return sessions.map(session => ({
      sessionId: session.id,
      tutorFullname: `${session.tutor.firstname} ${session.tutor.lastname}`,
      tutorInitials: `${session.tutor.firstname?.charAt(0)}${session.tutor.lastname?.charAt(0)}`,
      tutorEmail: session.tutor.email || "",
      status: session.status,
      sessionCourse: session.course.name,
      rawDateTime: session.sessionDateTime,
      //dateString: capitalizeMonth(session.sessionDateTime.toLocaleDateString('es-ES', {day: '2-digit', month: 'short', year: 'numeric'})),
      //timeString: session.sessionDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      place: session.place || "",
      duration: session.duration,
      price: Number(session.price),
      topic: session.topic
    }));
  } catch (error) {
    console.error("Failed to fetch student sessions:", error);
    throw new Error("Unable to fetch student sessions.");
  }
};