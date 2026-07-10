"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

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
      whatsapp: true,
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
  const session = await auth();

  if (!session?.user?.id) {
    return {error: "Usuario NO AUTORIZADO"};
  }
  const currentUserId = session.user.id;
  const validatedFields = UserPricingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const {
    durations,
    priceHalfHour,
    priceOneHour,
    priceOneHalfHour,
    priceTwoHours,
    priceTwoHalfHours,
    priceThreeHours,
  } = validatedFields.data;

  await db.userPricingConfiguration.deleteMany({
    where: {
      userId: currentUserId,
    },
  });

  const newPricing = [];

  if (durations.includes("0.5h")) {
    if (!priceHalfHour) {
      newPricing.push({
        userId: currentUserId,
        duration: 30,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: currentUserId,
        duration: 30,
        price: priceHalfHour,
      });
    }
  }
  if (durations.includes("1h")) {
    if (!priceOneHour) {
      newPricing.push({
        userId: currentUserId,
        duration: 60,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: currentUserId,
        duration: 60,
        price: priceOneHour,
      });
    }
  }
  if (durations.includes("1.5h")) {
    if (!priceOneHalfHour) {
      newPricing.push({
        userId: currentUserId,
        duration: 90,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: currentUserId,
        duration: 90,
        price: priceOneHalfHour,
      });
    }
  }
  if (durations.includes("2h")) {
    if (!priceTwoHours) {
      newPricing.push({
        userId: currentUserId,
        duration: 120,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: currentUserId,
        duration: 120,
        price: priceTwoHours,
      });
    }
  }
  if (durations.includes("2.5h")) {
    if (!priceTwoHalfHours) {
      newPricing.push({
        userId: currentUserId,
        duration: 150,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: currentUserId,
        duration: 150,
        price: priceTwoHalfHours,
      });
    }
  }
  if (durations.includes("3h")) {
    if (!priceThreeHours) {
      newPricing.push({
        userId: currentUserId,
        duration: 180,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: currentUserId,
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
  const session = await auth();

  if (!session?.user?.id) {
      return { error: "Usuario NO AUTORIZADO"};
  }

  const currentUserId = session.user.id;
  const validatedFields = UserCoursesSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const { courses } = validatedFields.data;

  const newTutorCourses = courses.map((courseId) => {
    return { tutorId: currentUserId, courseId: courseId };
  });

  try {
    await db.tutorCourse.deleteMany({
      where: {
        tutorId: currentUserId,
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
  entries: { dayOfWeek: number; timeSlot: number }[],
  userId: string
) => {
  const session = await auth();
  
  if (!session?.user?.id) {
    return{ error: "Usuario NO AUTORIZADO"};
  }
  
  const currentUserId = session.user.id;
  const newTutorCourses = entries.map((entry) => {
    return { tutorId: currentUserId, dayOfWeek: entry.dayOfWeek, timeSlot: entry.timeSlot };
  });

  try {
    await db.tutorAvailability.deleteMany({
      where: {
        tutorId: currentUserId,
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

  const { description, whatsapp } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        description: description,
        whatsapp: whatsapp,
      },
    });
    revalidatePath("/home/myprofile");
  } catch (error) {
    console.log(error);
    return null;
  }
};
