"use server";

import { db } from "@/lib/db";
import { addHours } from "date-fns";
import { auth } from "@/auth";
import {
  sessionResponseNotificationEmail,
  sessionCancelNotificationEmail,
} from "@/lib/mail";

export const getTutorSessions = async (userId: string) => {
  const aDayAgo = addHours(new Date(), -60);

  try {
    const sessions = await db.individualSession.findMany({
      where: {
        tutorId: userId,
        sessionDateTime: {
          gte: aDayAgo,
        },
      },
      include: {
        student: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
            whatsapp: true,
          },
        },
        course: {
          select: {
            name: true,
          },
        },
      },
    });

    return sessions.map((session) => ({
      sessionId: session.id,
      tutorFullname: `${session.student.firstname} ${session.student.lastname}`,
      tutorInitials: `${session.student.firstname?.charAt(
        0
      )}${session.student.lastname?.charAt(0)}`,
      tutorEmail: session.student.email || "",
      studentWhatsapp: session.student.whatsapp,
      status: session.status,
      sessionCourse: session.course.name,
      rawDateTime: session.sessionDateTime,
      place: session.place || "",
      duration: session.duration,
      price: Number(session.price),
      topic: session.topic,
      rate: session.tutorRating !== null ? Number(session.tutorRating) : null,
    }));
  } catch (error) {
    console.error("Failed to fetch student sessions:", error);
    throw new Error("Unable to fetch student sessions.");
  }
};

export const cancelSession = async (
  sessionId: number,
  email: string,
  userName: string
): Promise<string> => {
  try {
    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "canceled",
      },
    });

    await sessionCancelNotificationEmail(email, userName, new Date());

    return `Session ${updatedSession.id} has been successfully canceled.`;
  } catch (error) {
    console.error("Failed to cancel the session:", error);
    throw new Error(
      "Unable to cancel the session. Please make sure the session ID is correct."
    );
  }
};

export const acceptSession = async (
  sessionId: number,
  email: string,
  studentName: string
): Promise<string> => {
  try {
    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "accepted",
      },
    });

    const res = await db.user.findUnique({
      where: {
        id: updatedSession.tutorId,
      },
      select: {
        firstname: true,
      },
    });

    await sessionResponseNotificationEmail(
      email,
      res?.firstname || "",
      updatedSession.topic,
      updatedSession.sessionDateTime,
      studentName,
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

export const rejectSession = async (
  sessionId: number,
  email: string,
  studentName: string
): Promise<string> => {
  try {
    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "rejected",
      },
    });

    const res = await db.user.findUnique({
      where: {
        id: updatedSession.tutorId,
      },
      select: {
        firstname: true,
      },
    });

    await sessionResponseNotificationEmail(
      email,
      res?.firstname || "",
      updatedSession.topic,
      updatedSession.sessionDateTime,
      studentName,
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

  try {
    if (role === "student") {
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
    if (role === "tutor") {
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
  description: string,
  role: string
): Promise<string> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be signed in to perform this action");
  }

  try {
    // Update the session with a zero rating and a REPORTED SESSION comment based on the user's role
    const updatedSessionData =
      role === "student"
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
