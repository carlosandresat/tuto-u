import { StudentSessionCard } from "@/components/student-session-card";
import { getTutorSessions } from "@/actions/sessions-data";
import { auth } from "@/auth";
import { TutorSessionCard } from "@/components/tutor-session-card";

export async function TutorView() {
  /*const session = await auth()
  const tutorSessions:{
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
  }[] = await getTutorSessions(session?.user?.id || "")*/
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
    },
  ];
  return (
    <>
      {someData.length !== 0 ? (
        <>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 pt-24">
            Tus Tutorías (Tutor)
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Estas son tus solcitudes de tutorías recibidas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-w-screen-2xl w-full pt-6">
            {someData.map((row, index) => (
              <TutorSessionCard {...row} key={index}></TutorSessionCard>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
