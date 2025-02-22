"use server";

import { db } from "@/lib/db";

export const getUserProfile = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        tutorCourses: {
          include: {
            course: true,
          },
        },
        tutor_pricing: true,
        availabilities: true,
      },
    });

    if (!user) {
      return {error: "Unable to fetch user profile"};
    }

    return {
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      //whatsapp: user.description || "", // Assuming WhatsApp is stored in `description`
      profilePic: user.image || "/photos/placeholder.jpg",
      courses: user.tutorCourses.map((tc) => ({
        name: tc.course.name,
      })),
      pricing: user.tutor_pricing.map((p) => ({
        duration: `${p.duration/60}h`,
        price: Number(p.price),
      })),
      availability: user.availabilities.reduce((acc, a) => {
        const dayIndexToName = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ];

        const dayName = dayIndexToName[a.dayOfWeek];

        const existingDay = acc.find((d) => d.day === dayName);
        if (existingDay) {
          existingDay.hours.push(a.timeSlot);
        } else {
          acc.push({ day: dayName, hours: [a.timeSlot] });
        }
        return acc;
      }, [] as { day: string; hours: number[] }[]),
    };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Unable to fetch user profile.");
  }
};
