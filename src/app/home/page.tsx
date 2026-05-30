import { StudentView } from "@/components/student-view";
import { TutorView } from "@/components/tutor-view";
import { CourseCard } from "@/components/course-card";
import { TutorsCarousel } from "@/components/tutors-carousel";
import { PageContainer } from "@/components/page-container";
import { Footer } from "@/components/footer";

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
    { id: 21, name: "Aplicaciones Web", school: "mate" },
  ];

  return (
    <>
      <PageContainer size="2xl" className="justify-between min-h-screen">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-full text-left">
          Tus Tutorías
        </h1>
        <p className="text-lg text-muted-foreground mt-2 w-full text-left">
          Estas son las tutorías que has solicitado
        </p>

        <StudentView></StudentView>

        <TutorView></TutorView>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-24 w-full text-left">
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
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-24 w-full text-left">
          Top Tutores
        </h2>
        <TutorsCarousel></TutorsCarousel>
      </PageContainer>
      <Footer size="2xl" />
    </>
  );
}
