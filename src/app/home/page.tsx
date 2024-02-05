import { StudentView } from "@/components/student-view";
import { CourseCard } from "@/components/course-card";
import { TutorCard } from "@/components/tutor-card";
import { TutorsCarousel } from "@/components/tutors-carousel";

export default function Home() {
  const asignaturas = [
    { course: "Cálculo 1", school: "mate" },
    { course: "Cálculo 2", school: "mate" },
    { course: "Algebra Lineal", school: "mate" },
    { course: "Química 1", school: "quim" },
    { course: "Química 2", school: "quim" },
    { course: "Física 1", school: "fis" },
    { course: "Física 2", school: "fis" },
    { course: "Biología 1", school: "bio" },
    { course: "Biología 2", school: "bio" },
    { course: "Ciencias de la Tierra", school: "geo" },
    { course: "Probabilidad y Estadística", school: "mate" },
    { course: "Ecuaciones Diferenciales", school: "mate" },
    { course: "Métodos Numéricos", school: "mate" },
    { course: "Inglés", school: "lan" },
  ];

  const tutores = [
    {
      tutor: "Carlos Andrés Arévalo Torres",
      rating: 9.7,
      pic_url: "/photos/carlos.arevalo.jpg",
      nreviews: 78,
    },
    {
      tutor: "Carlos Arévalo2",
      rating: 9.7,
      pic_url: "/photos/carlos.arevalo.jpg",
      nreviews: 45,
    },
    {
      tutor: "Carlos Arévalo3",
      rating: 9.7,
      pic_url: "/photos/carlos.arevalo.jpg",
      nreviews: 19,
    },
    {
      tutor: "Carlos Arévalo4",
      rating: 9.7,
      pic_url: "/photos/carlos.arevalo.jpg",
      nreviews: 42,
    },
    {
      tutor: "Carlos Arévalo5",
      rating: 9.7,
      pic_url: "/photos/carlos.arevalo.jpg",
      nreviews: 29,
    },
    {
      tutor: "Carlos Arévalo6",
      rating: 9.7,
      pic_url: "/photos/carlos.arevalo.jpg",
      nreviews: 45,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 pt-32">
        Tus Tutorías
      </h2>

      <StudentView></StudentView>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-32">
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
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-32">
        Top Tutores
      </h2>
        <TutorsCarousel tutores={tutores}></TutorsCarousel>
    </main>
  );
}
