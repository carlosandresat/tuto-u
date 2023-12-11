import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <header className="flex items-center justify-between p-6 fixed top-0 left-0 right-0 bg-background z-10 border-b border-border">
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

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] pt-32 mt-20 lg:mt-40 mx-6 flex-col">
          <h1 className="scroll-m-20 text-4xl md:text-6xl font-extrabold tracking-tight lg:text-8xl">
            Tuto-U: Próximamente...
          </h1>
          
        </div>
<Link href="/inicio" className="mt-8 md:mt-16 md:mb-32">
            <Button variant="default">
              Explora la pagina en desarrollo <ArrowRight className="ml-2" />
            </Button>
          </Link>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary mt-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Why Tuto-U?
                </h2>
                <p className="mx-auto max-w-lg text-gray-500 md:text-xl dark:text-gray-400">
                  Tuto-U connects students with tutors who have excelled in the
                  same subjects. This unique approach fosters a community of
                  learners who support and learn from each other.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*Section with an animated countdown for release*/}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © Tuto-U. All rights reserved. Created by{" "}
          <span className="font-bold text-foreground">Carlos Arévalo</span>.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos y condiciones
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privavidad
          </Link>
        </nav>
      </footer>
    </>
  );
}
