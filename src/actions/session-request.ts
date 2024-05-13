"use server";

import { z } from "zod";
import { db } from "@/lib/db";

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
        nameInitials:  `${tutorCourse.tutor.firstname?.charAt(0)}${tutorCourse.tutor.lastname?.charAt(0)}}`,
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
