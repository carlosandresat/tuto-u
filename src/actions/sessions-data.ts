"use server";

import { db } from "@/lib/db";
import { addHours } from "date-fns";

function capitalizeMonth(dateStr:string) {
  return dateStr.replace(/(\d+)\s([a-z]+)\s(\d+)/i, (match, day, month, year) => {
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
  });
}

export const getTutorSessions = async (userId:string) => {
  const aDayAgo = addHours(new Date(), -24)

  try {
    const sessions = await db.individualSession.findMany({
      where: {
        tutorId: userId,
        sessionDateTime: {
          gte: aDayAgo
        }
      },
      include: {
        tutor: {
          select: {
            firstname: true,
            lastname: true,
            email: true
          }
        },
        course: {
          select: {
            name: true
          }
        }
      }
    });

    return sessions.map(session => ({
      sessionId: session.id,
      tutorFullname: `${session.tutor.firstname} ${session.tutor.lastname}`,
      tutorInitials: `${session.tutor.firstname?.charAt(0)}${session.tutor.lastname?.charAt(0)}`,
      tutorEmail: session.tutor.email || "",
      status: session.status,
      sessionCourse: session.course.name,
      rawDateTime: session.sessionDateTime,
      dateString: capitalizeMonth(session.sessionDateTime.toLocaleDateString('es-ES', {day: '2-digit', month: 'short', year: 'numeric'})),
      timeString: session.sessionDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      place: session.place || "",
      duration: session.duration,
      price: Number(session.price),
      topic: session.topic
    }));
  } catch (error) {
    console.error("Failed to fetch student sessions:", error);
    throw new Error("Unable to fetch student sessions.");
  }
};

export const cancelSession = async (sessionId: number): Promise<string> => {
  try {
    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "canceled",
      },
    });

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
    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "accepted",
      },
    });

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
    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "rejected",
      },
    });

    return `Session ${updatedSession.id} has been successfully rejected.`;
  } catch (error) {
    console.error("Failed to reject the session:", error);
    throw new Error(
      "Unable to reject the session. Please make sure the session ID is correct."
    );
  }
};
