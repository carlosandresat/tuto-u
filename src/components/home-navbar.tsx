import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { signOut } from "@/auth"

export function HomeNavbar() {
  return (
    <header className="flex items-center justify-between p-6 md:p-4 fixed top-0 left-0 right-0 bg-background z-10 border-b ">
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
                href="/home"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                <SheetClose>Inicio</SheetClose>
              </Link>
              <Link
                href="/home/myprofile"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                <SheetClose>Mi Perfil</SheetClose>
              </Link>

              <Link
                href="/home/history"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                <SheetClose>Historial</SheetClose>
              </Link>

              <Link
                href="/home/tutors"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                <SheetClose>Tutores</SheetClose>
              </Link>

              <Link
                href="/home/students"
                className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
              >
                <SheetClose>Estudiantes</SheetClose>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Link href="/home" className="flex items-center gap-6">
        <Image src="/images/logo.png" alt="logo" width={60} height={60} className="w-12 lg:w-16"/>
        <h2 className="text-3xl font-semibold tracking-tight hidden lg:block">
      Tuto-U
    </h2>

      </Link>

      <nav className="navbar hidden lg:block">
        <Link
          href="/home"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Inicio
        </Link>
        <Link
          href="/home/myprofile"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Mi Perfil
        </Link>

        <Link
          href="/home/history"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Historial
        </Link>

        <Link
          href="/home/tutors"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Tutores
        </Link>

        <Link
          href="/home/students"
          className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
        >
          Estudiantes
        </Link>
      </nav>
      <form action={async () => {
        "use server";
        await signOut()
      }}>
        <Button type="submit" aria-label="Logout Button"> <LogOut /> </Button>
      </form>
    </header>
  );
}
