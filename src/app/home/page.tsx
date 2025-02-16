import { StudentView } from "@/components/student-view";
import { TutorView } from "@/components/tutor-view";
import { CourseCard } from "@/components/course-card";
import { TutorsCarousel } from "@/components/tutors-carousel";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Megaphone } from "lucide-react";


export default function Home() {
  const asignaturas = [
    { id: 17, name: "Nivelación: Fundamentos de Matemáticas", school: "yt" },
    { id: 18, name: "Nivelación: Física", school: "yt" },
    { id: 19, name: "Nivelación: Química", school: "yt" },
    { id: 20, name: "Nivelación: Redacción", school: "yt" },
    { id: 1, name: "Cálculo 1", school: "mate" },
    { id: 2, name: "Cálculo 2", school: "mate" },
    { id: 3, name: "Cálculo 3", school: "mate" },
    { id: 4, name: "Algebra Lineal", school: "mate" },
    { id: 5, name: "Química 1", school: "quim" },
    { id: 6, name: "Química 2", school: "quim" },
    { id: 7, name: "Física 1", school: "fis" },
    { id: 8, name: "Física 2", school: "fis" },
    { id: 9, name: "Biología 1", school: "bio" },
    { id: 10, name: "Biología 2", school: "bio" },
    { id: 11, name: "Ciencias de la Tierra", school: "geo" },
    { id: 12, name: "Probabilidad y Estadística", school: "mate" },
    { id: 13, name: "Introducción a la Programación", school: "mate" },
    { id: 14, name: "Ecuaciones Diferenciales", school: "mate" },
    { id: 15, name: "Métodos Numéricos", school: "mate" },
    { id: 16, name: "Inglés", school: "lan" },
    { id: 21, name: "Aplicaciones Web", school: "mate" }
];

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 pt-32">
        Tus Tutorías
      </h2>
      <p className="text-lg text-muted-foreground mt-2">
      Estas son las tutorías que has solicitado
    </p>

      <StudentView></StudentView>

      <TutorView></TutorView>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-24">
        Asignaturas
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-screen-2xl mt-6 w-full">
        {asignaturas.map((asignatura) => (
          <CourseCard
            id={asignatura.id}
            course={asignatura.name}
            school={asignatura.school}
            key={asignatura.id}
          />
        ))}
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-24">
        Top Tutores
      </h2>
        <TutorsCarousel></TutorsCarousel>
    </main>
    <footer className="flex flex-col gap-2 md:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
      © Tuto-U. Todos los derechos reservados. Desarrollado por{" "}
      <span className="font-bold text-foreground">Tuto-U Team</span>.
    </p>
    <nav className="md:ml-auto flex gap-4 md:gap-6 mr-6">
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Términos y condiciones
      </Link>
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Privacidad
      </Link>
    </nav>
    <ModeToggle></ModeToggle>

  </footer>
  </>
  );
}
