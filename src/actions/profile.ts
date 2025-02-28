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
      description: user.description,
      whatsapp: user.whatsapp,
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

export const getUserNameByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        firstname: true,
        lastname: true,
      },
    });

    if (!user) {
      return "Not Found User";
    }

    return `${user.firstname} ${user.lastname}`;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return "Not Found User";
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        email: true,
      },
    });

    if (!user || !user.email) {
      return "not-found";
    }

    return user.email.split("@")[0].replace(".", "-")
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return "not-found";
  }
};

export const getTutorFormData = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        tutorCourses: {
          include: {
            course: true,
          },
        },
        availabilities: true,
        tutor_pricing: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      name: `${user.firstname} ${user.lastname}`,
      courses: user.tutorCourses.map((tc) => ({
        id: tc.course.id,
        course: tc.course.name,
      })),
      availability: user.availabilities.reduce((acc, a) => {
        const existingDay = acc.find((d) => d.day === a.dayOfWeek);
        if (existingDay) {
          existingDay.hours.push(a.timeSlot);
        } else {
          acc.push({ day: a.dayOfWeek, hours: [a.timeSlot] });
        }
        return acc;
      }, [] as { day: number; hours: number[] }[]),
      durations: user.tutor_pricing.map((p) => p.duration),
    };
  } catch (error) {
    console.error("Failed to fetch tutor form data:", error);
    throw new Error("Unable to fetch tutor form data.");
  }
};