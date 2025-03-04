import { StudentSessionCard } from "@/components/student-session-card";
import { getStudentSessions } from "@/actions/session-request";
import { auth } from "@/auth";

export async function StudentView() {
  const session = await auth();
  const studentSessions: {
    sessionId: number;
    tutorInitials: string;
    tutorEmail: string;
    tutorWhatsapp: string | null;
    status: string;
    tutorFullname: string;
    sessionCourse: string;
    place: string;
    duration: number;
    price: number;
    topic: string;
    rawDateTime: Date;
    rate: number | null;
  }[] = await getStudentSessions(session?.user?.id || "");
  const someData: {
    sessionId: number;
    tutorInitials: string;
    tutorEmail: string;
    status: string;
    tutorFullname: string;
    sessionCourse: string;
    dateString: string;
    timeString: string;
    place: string;
    duration: number;
    price: number;
    topic: string;
    rawDateTime: Date;
    rate: number | null;
  }[] = [
    {
      sessionId: 1,
      status: "accepted",
      tutorFullname: "Carlos Andrés Arévalo Torres",
      tutorInitials: "CA",
      tutorEmail: "carlos.arevalo@yachaytech.edu.ec",
      sessionCourse: "Cálculo 1",
      dateString: "12 May, 2024",
      timeString: "2:00 PM",
      place: "Sala de estudio biblioteca (planta baja)",
      duration: 120,
      price: 5.0,
      topic: "Teorema fundamental del Cálculo",
      rawDateTime: new Date("2024-05-12 14:41:50-05"),
      rate: null,
    },
    {
      sessionId: 2,
      status: "accepted",
      tutorFullname: "Carlos Andrés Arévalo Torres",
      tutorInitials: "CA",
      tutorEmail: "carlos.arevalo@yachaytech.edu.ec",
      sessionCourse: "Cálculo 1",
      dateString: "20 May, 2024",
      timeString: "4:00 PM",
      place: "Sala de estudio biblioteca (planta baja)",
      duration: 120,
      price: 5.0,
      topic: "Límites",
      rawDateTime: new Date("2024-05-20 14:41:50-05"),
      rate: null,
    },
    {
      sessionId: 3,
      status: "requested",
      tutorFullname: "Carlos Andrés Arévalo Torres",
      tutorInitials: "CA",
      tutorEmail: "carlos.arevalo@yachaytech.edu.ec",
      sessionCourse: "Álgebra Lineal",
      dateString: "20 Abr, 2024",
      timeString: "6:00 PM",
      place: "B-103",
      duration: 60,
      price: 2.8,
      topic: "Espacios Vectoriales",
      rawDateTime: new Date("2024-05-20 12:00:00-05"),
      rate: null,
    },
    {
      sessionId: 4,
      status: "canceled",
      tutorFullname: "Carlos Andrés Arévalo Torres",
      tutorInitials: "CA",
      tutorEmail: "carlos.arevalo@yachaytech.edu.ec",
      sessionCourse: "Química 2",
      dateString: "20 Abr, 2024",
      timeString: "6:00 PM",
      place: "Sala de estudio biblioteca (planta alta)",
      duration: 90,
      price: 3.5,
      topic: "Química Orgánica",
      rawDateTime: new Date("2024-05-20 12:00:00-05"),
      rate: null,
    },
  ];
  return (
    <>
      {studentSessions.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-w-screen-2xl w-full pt-6">
          {studentSessions.map((row, index) => (
            <StudentSessionCard {...row} key={index}></StudentSessionCard>
          ))}
        </div>
      ) : (
        <p className="text-lg mt-6 border-b pb-2">
          No has solicitado ninguna tutoría
        </p>
      )}
    </>
  );
}
