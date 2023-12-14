import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function HomeNavbar(){
    return(
        <header className="flex items-center justify-between p-6 fixed top-0 left-0 right-0 bg-background z-10 border-b "
        >
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
            href="/inicio"
            className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
          >
            Inicio
          </Link>
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
            </div>
          </SheetContent>
        </Sheet>
      </div>

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
            href="/inicio"
            className="mx-4 hover:border-b hover:border-solid hover:border-black dark:hover:border-white hover:pb-2"
          >
            Inicio
          </Link>
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
    )
}