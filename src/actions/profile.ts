"use server";

import { db } from "@/lib/db";

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
