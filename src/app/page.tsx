import { LoginDialog } from "@/components/login-dialog";
import { RegisterDialog } from "@/components/register-dialog";
import Link from "next/link";
import { CountdownTimer } from "@/components/countdown-timer";
import { StartNavbar } from "@/components/start-navbar";
import { ModeToggle } from "@/components/mode-toggle";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <>
      <StartNavbar />
      <main className="flex min-h-screen flex-col items-center w-full">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[380px] md:before:w-[580px] before:-translate-x-1 before:-translate-y-1/4 before:rounded-full before:bg-gradient-radial  before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic  after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-40  after:via-[#1a01ff] after:opacity-30 before:lg:h-[360px] z-[-2] pt-32 mt-20 lg:mt-40 mx-6 flex-col">
          <h1 className="scroll-m-20 text-4xl md:text-6xl font-extrabold tracking-tight lg:text-8xl z-0 text-center">
            Aprende, Enseña y Conecta
          </h1>
        </div>
        <div className="mt-8 md:mt-16 md:mb-32 space-x-0 md:space-x-2 flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
        <Link href="/auth/register"><Button variant="outline">Regístrate <UserPlus className="ml-2"></UserPlus></Button></Link>
        <Link href="/auth/login"><Button >¡Entrar ya!</Button></Link>

        </div>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary mt-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  ¿Qué es Tuto-U?
                </h2>
                <p className="mx-auto max-w-lg text-gray-500 md:text-xl dark:text-gray-400">
                  Tuto-U conecta a estudiantes con tutores que han destacado en
                  los mismos cursos. Aprende, enseña, obtén logros y crea
                  conexiones sólidas dentro de la universidad que te ayudarán a
                  crecer en tu carrera profesional.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 mt-2">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Cuenta Regresiva
                </h2>
                <p className="mx-auto max-w-xl text-gray-500 md:text-xl dark:text-gray-400">
                  Próxima Actualización
                </p>
                <CountdownTimer />
                <p className="mx-auto max-w-xl text-gray-500 md:text-xl dark:text-gray-400 pt-2">
                  30 de Junio de 2024 - 12:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*Section with an animated countdown for release*/}
      </main>
      <footer className="flex flex-col gap-2 md:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          © Tuto-U. Desarrollado por{" "}
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
