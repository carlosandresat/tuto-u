"use server";

import { db } from "@/lib/db";
import { addHours } from "date-fns";
import { auth } from "@/auth";
import {
  sessionResponseNotificationEmail,
  sessionCancelNotificationEmail,
} from "@/lib/mail";


export const cancelSession = async (sessionId: number): Promise<string> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Usuario NO AUTORIZADO");
    }
    const currentUserId = session.user.id;

    const existingSession = await db.individualSession.findUnique({
      where: { id: sessionId },
      include: {
        tutor: { select: { firstname: true, lastname: true, email: true } },
        student: { select: { firstname: true, lastname: true, email: true } },
      },
    });

    if (!existingSession) {
      throw new Error("Sesión no encontrada");
    }

    if (
      existingSession.tutorId !== currentUserId &&
      existingSession.studentId !== currentUserId
    ) {
      throw new Error("No tienes permiso de cancelar esta sesión");
    }

    const recipient =
      existingSession.tutorId === currentUserId
        ? existingSession.student
        : existingSession.tutor;

    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "canceled",
      },
    });

    await sessionCancelNotificationEmail(
      recipient.email || "",
      `${recipient.firstname} ${recipient.lastname}`,
      new Date()
    );

    return `Session ${updatedSession.id} has been successfully canceled.`;
  } catch (error) {
    console.error("Failed to cancel the session:", error);
    throw new Error(
      "Unable to cancel the session. Please make sure the session ID is correct."
    );
  }
};

export const acceptSession = async (sessionId: number): Promise<string> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Usuario NO AUTORIZADO");
    }
    const currentUserId = session.user.id;

    const existingSession = await db.individualSession.findUnique({
      where: { id: sessionId },
      include: {
        tutor: { select: { firstname: true } },
        student: { select: { firstname: true, lastname: true, email: true } },
      },
    });

    if (!existingSession) {
      throw new Error("Sesión no encontrada");
    }

    if (existingSession.tutorId !== currentUserId) {
      throw new Error("No tienes permiso de aceptar esta sesión");
    }

    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "accepted",
      },
    });

    await sessionResponseNotificationEmail(
      existingSession.student.email || "",
      existingSession.tutor.firstname || "",
      updatedSession.topic,
      updatedSession.sessionDateTime,
      `${existingSession.student.firstname} ${existingSession.student.lastname}`,
      "accepted"
    );

    return `Session ${updatedSession.id} has been successfully accepted.`;
  } catch (error) {
    console.error("Failed to accept the session:", error);
    throw new Error(
      "Unable to accept the session. Please make sure the session ID is correct."
    );
  }
};

export const rejectSession = async (sessionId: number): Promise<string> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Usuario NO AUTORIZADO");
    }
    const currentUserId = session.user.id;

    const existingSession = await db.individualSession.findUnique({
      where: { id: sessionId },
      include: {
        tutor: { select: { firstname: true } },
        student: { select: { firstname: true, lastname: true, email: true } },
      },
    });

    if (!existingSession) {
      throw new Error("Sesión no encontrada");
    }

    if (existingSession.tutorId !== currentUserId) {
      throw new Error("No tienes permiso para rechazar esta sesión");
    }

    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "rejected",
      },
    });

    await sessionResponseNotificationEmail(
      existingSession.student.email || "",
      existingSession.tutor.firstname || "",
      updatedSession.topic,
      updatedSession.sessionDateTime,
      `${existingSession.student.firstname} ${existingSession.student.lastname}`,
      "rejected"
    );

    return `Session ${updatedSession.id} has been successfully rejected.`;
  } catch (error) {
    console.error("Failed to reject the session:", error);
    throw new Error(
      "Unable to reject the session. Please make sure the session ID is correct."
    );
  }
};

export const rateSession = async (
  sessionId: number,
  role: string,
  rate: number,
  comment: string | undefined
): Promise<string> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be signed in to perform this action");
  }
  const currentUserId = session.user.id;
  const existingSession = await db.individualSession.findUnique({
    where: {
      id: sessionId},
  });

  if (!existingSession) {
    throw new Error ("Sesión no encontrada");
  }

  if (
    existingSession.studentId !== currentUserId &&
    existingSession.tutorId !== currentUserId
  ){
    throw new Error ("No tienes permiso para calificar esta sesión")
  }
  try {
    if (existingSession.studentId === currentUserId) {
      await db.individualSession.update({
        where: {
          id: sessionId,
        },
        data: {
          studentRating: rate,
          studentComment: comment,
        },
      });
    }
    if (existingSession.tutorId === currentUserId) {
      await db.individualSession.update({
        where: {
          id: sessionId,
        },
        data: {
          tutorRating: rate,
          tutorComment: comment,
        },
      });
    }
    const achievementExists = await db.userAchievement.findFirst({
      where: {
        userId: session.user.id,
        achievementId: 11,
      },
    });

    // If it's the first time, add an achievement
    if (!achievementExists) {
      await db.userAchievement.create({
        data: {
          userId: session.user.id,
          achievementId: 11,
        },
      });
    }
    return `Session has been successfully rated.`;
  } catch (error) {
    console.error("Failed to rate the session:", error);
    throw new Error(
      "Unable to rate the session. Please make sure the session ID is correct."
    );
  }
};

export const reportSession = async (
  sessionId: number,
  description: string
): Promise<string> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be signed in to perform this action");
  }
  const currentUserId = session.user.id;
  const existingSession = await db.individualSession.findUnique({
    where: {
      id: sessionId    },
  });

  if (!existingSession) {
    throw new Error ("Sesión no encontrada")
  }

  if (
    existingSession.studentId !== currentUserId &&
    existingSession.tutorId !== currentUserId
  ){
    throw new Error ("No tienes permiso para reportar esta sesión")
  }
  try {
    // Update the session with a zero rating and a REPORTED SESSION comment based on the user's role
    const updatedSessionData =
      currentUserId === existingSession.studentId
        ? {
            studentRating: 0,
            studentComment: "REPORTED SESSION",
          }
        : {
            tutorRating: 0,
            tutorComment: "REPORTED SESSION",
          };

    await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: updatedSessionData,
    });

    // Create a new report entry
    await db.sessionReport.create({
      data: {
        sessionId: sessionId,
        reporterId: session.user.id,
        description: description,
      },
    });

    return `Session has been successfully reported and the related report has been recorded.`;
  } catch (error) {
    console.error("Failed to report the session:", error);
    throw new Error(
      "Unable to report the session. Please make sure the session ID is correct."
    );
  }
};
