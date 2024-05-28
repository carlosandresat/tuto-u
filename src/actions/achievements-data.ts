"use server";

import { db } from "@/lib/db";

export const getUserAchievements = async (userId: string) => {
  try {
    // Obtiene los logros con detalles y cuenta cuántos usuarios tienen cada logro
    const achievements = await db.userAchievement.findMany({
      where: {
        userId: userId,
      },
      include: {
        achievement: {
          include: {
            users: true, // Necesitamos esto para contar los usuarios más adelante
          },
        },
      },
    });

    // Mapea los resultados para incluir los detalles del logro y la cuenta de usuarios
    const results = achievements.map((ua) => ({
      id: ua.achievement.id,
      name: ua.achievement.name,
      description: ua.achievement.description,
      tier: ua.achievement.tier,
      imageUrl: ua.achievement.imageUrl,
      userCount: ua.achievement.users.length,
      isInverted: ua.achievement.isInverted,
    }));

    return results;
  } catch (error) {
    console.error("Failed to fetch user achievements:", error);
    throw new Error("Unable to fetch user achievements.");
  }
};
