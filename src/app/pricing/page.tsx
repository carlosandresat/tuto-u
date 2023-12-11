import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export default function Pricing() {
  return (
    <>
            <header className="flex items-center justify-between p-6 fixed top-0 left-0 right-0 bg-background z-10 border-b border-border">
          <Link href="/" className="logo">
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
          </Link>

              <nav className="navbar hidden lg:block">
            <Link
              href="/"
              className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
            >
              Inicio
            </Link>
            <a
              href="#objetivo"
              className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
            >
              Cómo funciona
            </a>

            <Link
              href="/pricing"
              className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
            >
              Precios
            </Link>

            <a
              href="#objetivo"
              className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
            >
              Nuestro Equipo
            </a>

            <a
              href="#student-view"
              className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
            >
              Preguntas frecuentes
            </a>
          </nav>
          <ModeToggle></ModeToggle>
        </header>

      <section className="min-h-screen w-full py-12 flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-32 md:mt-6 max-w-screen-xl">
          Precios
        </h2>

        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Mensual</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$6</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">Cobrar por tutorías</div>
                  </li>

                  <li className="flex items-center ">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">
                      Hasta 10 solicitudes de tutoría pagadas por mes
                    </div>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2" />
                    <div className="w-full">Basic Video Templates</div>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
            <div className="relative flex flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
              <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-center">Trimestral</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$5</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                    Cobrar por tutorías
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Hasta 30 solicitudes de tutoría pagadas por mes
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Premium Video Templates
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Collaboration Tools
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="flex flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Semestral</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$4.5</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Cobrar por tutorías
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Hasta 60 solicitudes de tutoría pagadas por mes
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Custom Video Templates
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Advanced Collaboration Tools
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Dedicated Support
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
