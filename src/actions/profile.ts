"use server";

import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        username: true,
      },
    });

    if (!user || !user.username) {
      return "not-found";
    }

    return user.username;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return "not-found";
  }
};
