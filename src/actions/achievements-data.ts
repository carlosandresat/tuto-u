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

export const getAllAchievementsWithProgress = async (userId: string) => {
  try {
    // 1. Obtener conteo de sesiones completadas como estudiante
    const completedStudentSessions = await db.individualSession.count({
      where: {
        studentId: userId,
        status: "accepted",
        sessionDateTime: {
          lt: new Date(),
        },
      },
    });

    // 2. Obtener conteo de sesiones completadas como tutor
    const completedTutorSessions = await db.individualSession.count({
      where: {
        tutorId: userId,
        status: "accepted",
        sessionDateTime: {
          lt: new Date(),
        },
      },
    });

    // 3. Obtener logros actualmente desbloqueados por el usuario
    const userAchievements = await db.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });
    const ownedIds = new Set(userAchievements.map((ua) => ua.achievementId));

    // 4. Sincronizar automáticamente logros basados en umbrales de sesiones
    const achievementsToUnlock: number[] = [];
    if (completedStudentSessions >= 5 && !ownedIds.has(4)) achievementsToUnlock.push(4);
    if (completedStudentSessions >= 15 && !ownedIds.has(3)) achievementsToUnlock.push(3);
    if (completedStudentSessions >= 30 && !ownedIds.has(2)) achievementsToUnlock.push(2);

    if (completedTutorSessions >= 5 && !ownedIds.has(7)) achievementsToUnlock.push(7);
    if (completedTutorSessions >= 15 && !ownedIds.has(6)) achievementsToUnlock.push(6);
    if (completedTutorSessions >= 30 && !ownedIds.has(5)) achievementsToUnlock.push(5);

    for (const achId of achievementsToUnlock) {
      await db.userAchievement.create({
        data: {
          userId,
          achievementId: achId,
        },
      });
      ownedIds.add(achId);
    }

    // 5. Re-obtener los logros del usuario con sus fechas de obtención correspondientes
    const finalUserAchievements = await db.userAchievement.findMany({
      where: { userId },
    });
    const achievementDateMap = new Map<number, Date>();
    finalUserAchievements.forEach((ua) => {
      achievementDateMap.set(ua.achievementId, ua.achievedDate);
    });

    // 6. Obtener todos los logros disponibles con sus contadores de usuarios totales
    const allAchievements = await db.achievement.findMany({
      include: {
        users: true,
      },
    });

    // 7. Mapear cada logro con su respectivo progreso e información de desbloqueo
    const results = allAchievements.map((ach) => {
      const isOwned = ownedIds.has(ach.id);
      const achievedDate = achievementDateMap.get(ach.id) || null;
      const userCount = ach.users.length;

      // Calcular el progreso específico para cada tipo de logro
      let currentProgress = 0;
      let targetProgress = 1;

      if (ach.id === 2) {
        // Estudiante de Oro
        currentProgress = completedStudentSessions;
        targetProgress = 30;
      } else if (ach.id === 3) {
        // Estudiante de Plata
        currentProgress = completedStudentSessions;
        targetProgress = 15;
      } else if (ach.id === 4) {
        // Estudiante de Bronce
        currentProgress = completedStudentSessions;
        targetProgress = 5;
      } else if (ach.id === 5) {
        // Tutor de Oro
        currentProgress = completedTutorSessions;
        targetProgress = 30;
      } else if (ach.id === 6) {
        // Tutor de Plata
        currentProgress = completedTutorSessions;
        targetProgress = 15;
      } else if (ach.id === 7) {
        // Tutor de Bronce
        currentProgress = completedTutorSessions;
        targetProgress = 5;
      } else {
        // Logros no cuantitativos / binarios
        currentProgress = isOwned ? 1 : 0;
        targetProgress = 1;
      }

      const percentage = Math.min(100, Math.round((currentProgress / targetProgress) * 100));

      return {
        id: ach.id,
        name: ach.name,
        description: ach.description,
        tier: ach.tier,
        imageUrl: ach.imageUrl,
        isInverted: ach.isInverted,
        userCount,
        isOwned,
        achievedDate,
        progress: {
          current: currentProgress,
          target: targetProgress,
        },
        percentage,
      };
    });

    // Retornar las sesiones completadas junto con la lista de logros para estadísticas en el UI
    return {
      achievements: results,
      stats: {
        completedStudentSessions,
        completedTutorSessions,
        totalAchievements: results.length,
        ownedAchievements: results.filter((r) => r.isOwned).length,
      },
    };
  } catch (error) {
    console.error("Failed to fetch all achievements with progress:", error);
    throw new Error("Unable to fetch all achievements with progress.");
  }
};

