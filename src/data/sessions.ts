import { db } from "@/lib/db"
import { addHours } from "date-fns";
import { auth } from "@/auth";


export const getStudentSessions = async () => {
    
  const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized: no active session.");
    }

    const currentUserId = session.user.id;
    const aDayAgo = addHours(new Date(), -60);
  try {
    
    const sessions = await db.individualSession.findMany({
      where: {
        studentId: currentUserId,
        sessionDateTime: {
          gte: aDayAgo,
        },
      },
      include: {
        tutor: {
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

    return sessions.map((tutoringSession) => ({
      sessionId: tutoringSession.id,
      tutorFullname: `${tutoringSession.tutor.firstname} ${tutoringSession.tutor.lastname}`,
      tutorInitials: `${tutoringSession.tutor.firstname?.charAt(
        0
      )}${tutoringSession.tutor.lastname?.charAt(0)}`,
      tutorEmail: tutoringSession.tutor.email || "",
      tutorWhatsapp: tutoringSession.tutor.whatsapp,
      status: tutoringSession.status,
      sessionCourse: tutoringSession.course.name,
      rawDateTime: tutoringSession.sessionDateTime,
      //dateString: capitalizeMonth(session.sessionDateTime.toLocaleDateString('es-ES', {day: '2-digit', month: 'short', year: 'numeric'})),
      //timeString: session.sessionDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      place: tutoringSession.place || "",
      duration: tutoringSession.duration,
      price: Number(tutoringSession.price),
      topic: tutoringSession.topic,
      rate:
        tutoringSession.studentRating !== null 
        ? Number(tutoringSession.studentRating) 
        : null,
    }));
  } catch (error) {
    console.error("Failed to fetch students sessions:", error);
    throw new Error("Unable to fetch students sessions.");
  }
};

export const getTutorSessions = async () => {
  
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized: no active session.");
    }
    const currentUserId = session.user.id;
    const aDayAgo = addHours(new Date(), -60);

  try {
    const sessions = await db.individualSession.findMany({
      where: {
        tutorId: currentUserId,
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

    return sessions.map((tutoringSession) => ({
      sessionId: tutoringSession.id,
      tutorFullname: `${tutoringSession.student.firstname} ${tutoringSession.student.lastname}`,
      tutorInitials: `${tutoringSession.student.firstname?.charAt(
        0
      )}${tutoringSession.student.lastname?.charAt(0)}`,
      tutorEmail: tutoringSession.student.email || "",
      studentWhatsapp: tutoringSession.student.whatsapp,
      status: tutoringSession.status,
      sessionCourse: tutoringSession.course.name,
      rawDateTime: tutoringSession.sessionDateTime,
      place: tutoringSession.place || "",
      duration: tutoringSession.duration,
      price: Number(tutoringSession.price),
      topic: tutoringSession.topic,
      rate: tutoringSession.tutorRating !== null ? Number(tutoringSession.tutorRating) : null,
    }));
  } catch (error) {
    console.error("Failed to fetch tutor sessions:", error);
    throw new Error("Unable to fetch tutor sessions.");
  }
};