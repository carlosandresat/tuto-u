"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getUserById = async (id: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }  
  
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
