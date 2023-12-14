import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CountdownTimer } from "@/components/countdown-timer";
import { StartNavbar } from "@/components/start-navbar";


export default function Home() {

  const onCampusDate = new Date("2024-02-24 00:00:00").getTime();

  return (
    <>
      <StartNavbar />
      <main className="flex min-h-screen flex-col items-center w-full">

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[380px] md:before:w-[580px] before:-translate-x-1 before:-translate-y-1/4 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-40 after:dark:from-sky-900 after:dark:via-[#1a01ff] after:dark:opacity-30 before:lg:h-[360px] z-[-2] pt-32 mt-20 lg:mt-40 mx-6 flex-col">
          <h1 className="scroll-m-20 text-4xl md:text-6xl font-extrabold tracking-tight lg:text-8xl z-0 text-center">
            Tuto-U: Próximamente...
          </h1>
          
        </div>
        
<Link href="/home" className="mt-8 md:mt-16 md:mb-32">
            <Button variant="default">
              Explora la página en desarrollo <ArrowRight className="ml-2" />
            </Button>
          </Link>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary mt-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  ¿Por qué Tuto-U?
                </h2>
                <p className="mx-auto max-w-lg text-gray-500 md:text-xl dark:text-gray-400">
                Tuto-U conecta a estudiantes con tutores que han destacado en los mismos cursos. Este enfoque único fomenta una comunidad de aprendices que se apoyan y aprenden mutuamente.
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
                  Hult Prize 2024 OnCampus Finals
                </p>
                <CountdownTimer targetTime={onCampusDate} />
                <p className="mx-auto max-w-xl text-gray-500 md:text-xl dark:text-gray-400 pt-2">
                  24 de Febrero de 2024
                </p>

              </div>
            </div>
          </div>
        </section>
        {/*Section with an animated countdown for release*/}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © Tuto-U. All rights reserved. Developed by{" "}
          <span className="font-bold text-foreground">Tuto-U Team</span>.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos y condiciones
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </>
  );
}
