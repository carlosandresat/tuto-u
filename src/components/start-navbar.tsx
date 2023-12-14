import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function StartNavbar() {
  return (
    <header className="flex items-center justify-between p-6 fixed top-0 left-0 right-0 bg-background z-10 border-b border-border">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-auto">
            <div className="flex flex-col items-center justify-center py-4 gap-8 mt-6 px-6">
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <a href="/" className="logo">
        <Image
          src="/images/logo-white.png"
          alt="logo-white"
          width={75}
          height={75}
          className="dark:hidden"
        />
        <Image
          src="/images/logo.png"
          alt="logo-dark"
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
  );
}
