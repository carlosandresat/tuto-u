import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { TutorCard } from "@/components/tutor-card";

export default function Inicio() {
  const asignaturas = [
    { course: "Inteligencia Artificial Avanzada", school: "mate" },
    { course: "Computación Cuántica", school: "mate" },
    { course: "Sistemas Distribuidos", school: "mate" },
    { course: "Seguridad Informática Avanzada", school: "mate" },
    { course: "Procesamiento de Lenguaje Natural", school: "mate" },
    { course: "Visión por Computadora", school: "mate" },
    { course: "Redes Neuronales Profundas", school: "mate" },
    { course: "Algoritmos Avanzados", school: "mate" },
    { course: "Robótica Autónoma", school: "mate" },
    { course: "Computación Gráfica Avanzada", school: "mate" },
    { course: "Bioinformática", school: "mate" },
    { course: "Computación Paralela y Concurrente", school: "mate" },
    { course: "Teoría de Juegos y Computación", school: "mate" },
    { course: "Criptografía Moderna", school: "mate" },
    { course: "Arquitecturas de Computadoras Avanzadas", school: "mate" },
    { course: "Diseño de Compiladores Avanzado", school: "mate" },
    { course: "Métodos Formales en la Ingeniería de Software", school: "mate" },
    { course: "Big Data y Procesamiento de Datos a Escala", school: "mate" },
    { course: "Internet de las Cosas (IoT) Avanzado", school: "mate" },
    { course: "Computación en la Nube Escalable y Eficiente", school: "mate" },
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
      <header className="flex items-center justify-between p-6 fixed top-0 left-0 right-0 bg-background z-10">
        <a href="#home" className="logo">
          <Image
            src="/images/logo-white.png"
            alt=""
            width={75}
            height={75}
            className="dark:hidden"
          />
          <Image
            src="/images/logo.png"
            alt=""
            width={75}
            height={75}
            className="hidden dark:block"
          />
        </a>

        <nav className="navbar">
          <a
            href="#home"
            className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
          >
            Inicio
          </a>
          <a
            href="#objetivo"
            className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
          >
            Perfil
          </a>

          <a
            href="#tutor-view"
            className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
          >
            Historial
          </a>

          <a
            href="#objetivo"
            className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
          >
            Tutores
          </a>

          <a
            href="#student-view"
            className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
          >
            Estudiantes
          </a>
        </nav>
        <ModeToggle></ModeToggle>
      </header>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-32">
        Asignaturas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-screen-2xl mt-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-2xl mt-6">
        {tutores.map((tutor) => (
          <TutorCard
            tutor={tutor.tutor}
            rating={tutor.rating}
            pic_url={tutor.pic_url}
            nreviews={tutor.nreviews}
            key={tutor.tutor}
          />
        ))}
      </div>
    </main>
  );
}
