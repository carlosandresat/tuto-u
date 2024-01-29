import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function StartNavbar() {
  return (
    <header className="flex items-center justify-between p-6 fixed top-0 w-full  bg-background z-10 border-b border-border">
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
              <Link
                href="/how"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                Cómo funciona
              </Link>

              <Link
                href="/pricing"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                Precios
              </Link>

              <Link
                href="/ourteam"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                Nuestro Equipo
              </Link>

              <Link
                href="/faq"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                Preguntas frecuentes
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <Link href="/" className="flex items-center gap-6">
        <Image src="/images/logo.png" alt="logo" width={60} height={60} className="w-12 lg:w-16"/>
        <h2 className="text-3xl font-semibold tracking-tight hidden lg:block">
      Tuto-U
    </h2>

      </Link>


      <nav className="navbar hidden lg:block">
        <Link
          href="/"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Inicio
        </Link>
        <Link
          href="/how"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Cómo funciona
        </Link>

        <Link
          href="/pricing"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Precios
        </Link>

        <Link
          href="/ourteam"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Nuestro Equipo
        </Link>

        <Link
          href="/faq"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Preguntas frecuentes
        </Link>
      </nav>
      <ModeToggle></ModeToggle>
    </header>
  );
}
