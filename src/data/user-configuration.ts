import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getUserData = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }
  const currentUserId = session.user.id;

  const data = await db.user.findUnique({
    where: {
      id: currentUserId,
    },
    select: {
      username: true,
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

export const getUserPricing = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }
  const currentUserId = session.user.id;

  const data = await db.userPricingConfiguration.findMany({
    where: {
      userId: currentUserId,
    },
    select: {
      duration: true,
      price: true,
    },
  });
  return data;
};

export const getUserCourses = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }
  const currentUserId = session.user.id;

  const data = await db.tutorCourse.findMany({
    where: {
      tutorId: currentUserId,
    },
    select: {
      courseId: true,
    },
  });
  return data;
};

export const getUserAvailability = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }
  const currentUserId = session.user.id;

  try {
    const data = await db.tutorAvailability.findMany({
      where: {
        tutorId: currentUserId,
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