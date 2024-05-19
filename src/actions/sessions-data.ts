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
        student: {
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
      tutorFullname: `${session.student.firstname} ${session.student.lastname}`,
      tutorInitials: `${session.student.firstname?.charAt(0)}${session.student.lastname?.charAt(0)}`,
      tutorEmail: session.student.email || "",
      status: session.status,
      sessionCourse: session.course.name,
      rawDateTime: session.sessionDateTime,
      place: session.place || "",
      duration: session.duration,
      price: Number(session.price),
      topic: session.topic,
      rate: session.tutorRating !== null ? Number(session.tutorRating) : null
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

export const rateSession = async (sessionId: number, role: string, rate:number, comment:string|undefined): Promise<string> => {
  try {
    if(role==="student"){
      await db.individualSession.update({
        where: {
          id: sessionId,
        },
        data: {
          studentRating: rate,
          studentComment: comment,
        },
      });
    } if (role === "tutor") {
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
    return `Session has been successfully rated.`;
  } catch (error) {
    console.error("Failed to rate the session:", error);
    throw new Error(
      "Unable to rate the session. Please make sure the session ID is correct."
    );
  }
};