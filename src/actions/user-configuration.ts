"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import {
  UserPricingSchema,
  UserCoursesSchema,
  UserAvailabilitySchema,
  UserBasicsSchema,
} from "@/schemas";

export const getUserData = async (userId: string) => {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstname: true,
      lastname: true,
      email: true,
      image: true,
      description: true,
    },
  });

  return data;
};

export const getUserPricing = async (userId: string) => {
  const data = await db.userPricingConfiguration.findMany({
    where: {
      userId: userId,
    },
    select: {
      duration: true,
      price: true,
    },
  });
  return data;
};

export const updateUserPricing = async (
  data: z.infer<typeof UserPricingSchema>,
  userId: string
) => {
  const validatedFields = UserPricingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const {
    durations,
    priceOneHour,
    priceOneHalfHour,
    priceTwoHours,
    priceTwoHalfHours,
    priceThreeHours,
  } = validatedFields.data;

  await db.userPricingConfiguration.deleteMany({
    where: {
      userId: userId,
    },
  });

  const newPricing = [];

  if (durations.includes("1h")) {
    if (!priceOneHour) {
      newPricing.push({
        userId: userId,
        duration: 60,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 60,
        price: priceOneHour,
      });
    }
  }
  if (durations.includes("1.5h")) {
    if (!priceOneHalfHour) {
      newPricing.push({
        userId: userId,
        duration: 90,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 90,
        price: priceOneHalfHour,
      });
    }
  }
  if (durations.includes("2h")) {
    if (!priceTwoHours) {
      newPricing.push({
        userId: userId,
        duration: 120,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 120,
        price: priceTwoHours,
      });
    }
  }
  if (durations.includes("2.5h")) {
    if (!priceTwoHalfHours) {
      newPricing.push({
        userId: userId,
        duration: 150,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 150,
        price: priceTwoHalfHours,
      });
    }
  }
  if (durations.includes("3h")) {
    if (!priceThreeHours) {
      newPricing.push({
        userId: userId,
        duration: 180,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 180,
        price: priceThreeHours,
      });
    }
  }

  await db.userPricingConfiguration.createMany({
    data: newPricing,
  });

  revalidatePath("/home/myprofile");

  return { sucess: "Precios actualizados" };
};

export const getUserCourses = async (userId: string) => {
  const data = await db.tutorCourse.findMany({
    where: {
      tutorId: userId,
    },
    select: {
      courseId: true,
    },
  });
  return data;
};

export const updateUserCourses = async (
  data: z.infer<typeof UserCoursesSchema>,
  userId: string
) => {
  const validatedFields = UserCoursesSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { courses } = validatedFields.data;

  const newTutorCourses = courses.map((courseId) => {
    return { tutorId: userId, courseId: courseId };
  });

  try {
    await db.tutorCourse.deleteMany({
      where: {
        tutorId: userId,
      },
    });
    await db.tutorCourse.createMany({
      data: newTutorCourses,
    });
    revalidatePath("/home/myprofile");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserAvailability = async (userId: string) => {
  try {
    const data = await db.tutorAvailability.findMany({
      where: {
        tutorId: userId,
      },
      select: {
        dayOfWeek: true,
        timeSlot: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateUserAvailability = async (
  data: z.infer<typeof UserAvailabilitySchema>,
  userId: string
) => {
  const validatedFields = UserAvailabilitySchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const {
    mondayAvailability,
    tuesdayAvailability,
    wednesdayAvailability,
    thursdayAvailability,
    fridayAvailability,
    saturdayAvailability,
    sundayAvailability,
  } = validatedFields.data;

  const newMondayEntries = mondayAvailability.map((hour) => {
    return { tutorId: userId, dayOfWeek: 1, timeSlot: Number(hour) };
  });
  const newTuesdayEntries = tuesdayAvailability.map((hour) => {
    return { tutorId: userId, dayOfWeek: 2, timeSlot: Number(hour) };
  });
  const newWednesdayEntries = wednesdayAvailability.map((hour) => {
    return { tutorId: userId, dayOfWeek: 3, timeSlot: Number(hour) };
  });
  const newThursdayEntries = thursdayAvailability.map((hour) => {
    return { tutorId: userId, dayOfWeek: 4, timeSlot: Number(hour) };
  });
  const newFridayEntries = fridayAvailability.map((hour) => {
    return { tutorId: userId, dayOfWeek: 5, timeSlot: Number(hour) };
  });
  const newSaturdayEntries = saturdayAvailability.map((hour) => {
    return { tutorId: userId, dayOfWeek: 6, timeSlot: Number(hour) };
  });
  const newSundayEntries = sundayAvailability.map((hour) => {
    return { tutorId: userId, dayOfWeek: 0, timeSlot: Number(hour) };
  });

  const newTutorCourses = newMondayEntries.concat(
    newTuesdayEntries,
    newWednesdayEntries,
    newThursdayEntries,
    newFridayEntries,
    newSaturdayEntries,
    newSundayEntries
  );

  try {
    await db.tutorAvailability.deleteMany({
      where: {
        tutorId: userId,
      },
    });
    await db.tutorAvailability.createMany({
      data: newTutorCourses,
    });
    revalidatePath("/home/myprofile");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserDescription = async (
  data: z.infer<typeof UserBasicsSchema>,
  userId: string
) => {
  const validatedFields = UserBasicsSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { description } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        description: description,
      },
    });
    revalidatePath("/home/myprofile");
  } catch (error) {
    console.log(error);
    return null;
  }
};
