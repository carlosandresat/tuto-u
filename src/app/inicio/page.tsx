import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Inicio() {
  const asignaturas = [
    "Inteligencia Artificial Avanzada",
    "Computación Cuántica",
    "Sistemas Distribuidos",
    "Seguridad Informática Avanzada",
    "Procesamiento de Lenguaje Natural",
    "Visión por Computadora",
    "Redes Neuronales Profundas",
    "Algoritmos Avanzados",
    "Robótica Autónoma",
    "Computación Gráfica Avanzada",
    "Bioinformática",
    "Computación Paralela y Concurrente",
    "Teoría de Juegos y Computación",
    "Criptografía Moderna",
    "Arquitecturas de Computadoras Avanzadas",
    "Diseño de Compiladores Avanzado",
    "Métodos Formales en la Ingeniería de Software",
    "Big Data y Procesamiento de Datos a Escala",
    "Internet de las Cosas (IoT) Avanzado",
    "Computación en la Nube Escalable y Eficiente",
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
          <div
            className="p-8 text-center border flex flex-col items-center rounded-lg justify-between"
            key={asignatura}
          >
            <div className="flex flex-col items-center pb-6 h-full">
              <Image
                src="/images/mate.png"
                alt="Asignatura1"
                width={100}
                height={100}
              />
              <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight h-full flex items-center">
                {asignatura}
              </h3>
            </div>
            <Button>Solicitar tutoría </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
