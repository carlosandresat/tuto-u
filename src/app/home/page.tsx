import { StudentView } from "@/components/student-view";
import { TutorView } from "@/components/tutor-view";
import { CourseCard } from "@/components/course-card";
import { TutorsCarousel } from "@/components/tutors-carousel";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const asignaturas = [
    { course: "Nivelación: Fundamentos de Matemáticas", school: "yt" },
    { course: "Nivelación: Física", school: "yt" },
    { course: "Nivelación: Química", school: "yt" },
    { course: "Nivelación: Redacción", school: "yt" },
    { course: "Cálculo 1", school: "mate" },
    { course: "Cálculo 2", school: "mate" },
    { course: "Cálculo 3", school: "mate" },
    { course: "Algebra Lineal", school: "mate" },
    { course: "Química 1", school: "quim" },
    { course: "Química 2", school: "quim" },
    { course: "Física 1", school: "fis" },
    { course: "Física 2", school: "fis" },
    { course: "Biología 1", school: "bio" },
    { course: "Biología 2", school: "bio" },
    { course: "Ciencias de la Tierra", school: "geo" },
    { course: "Probabilidad y Estadística", school: "mate" },
    { course: "Introducción a la Programación", school: "mate" },
    { course: "Ecuaciones Diferenciales", school: "mate" },
    { course: "Métodos Numéricos", school: "mate" },
    { course: "Inglés", school: "lan" },
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
            course={asignatura.course}
            school={asignatura.school}
            key={asignatura.course}
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
