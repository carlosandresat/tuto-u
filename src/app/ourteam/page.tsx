import { StartNavbar } from "@/components/start-navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Github } from "lucide-react";

export default function OurTeam() {
  return (
    <>
      <StartNavbar />

      <section className="pt-44 w-full flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl">
          Nuestro Equipo
        </h2>
        <p className="scroll-m-20 text-lg text-muted-foreground mt-4 max-w-screen-md px-8 text-center">
          Conoce a los miembros de nuestra Start-Up
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl p-8 w-full">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4">
              <Avatar className="w-48 h-48">
                <AvatarImage
                  alt="Team member 1"
                  src="/photos/carlos.arevalo.jpg"
                  className="object-cover"
                />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold">Carlos Arévalo</h3>
                <p className="text-muted-foreground">CEO</p>
                <p className="text-sm">
                  Carlos lidera Tuto-U enfocándose en la estrategia y el
                  crecimiento sostenible. Coordina alianzas con instituciones
                  educativas para promover la tutoría entre pares.
                </p>
                <div className="flex gap-2">
                  <Link href="#">
                    <TwitterIcon className="w-4 h-4" />
                  </Link>
                  <Link href="#">
                    <LinkedinIcon className="w-4 h-4" />
                  </Link>
                  <Link href="#">
                    <Github className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
          <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4">
              <Avatar className="w-48 h-48">
                <AvatarImage
                  alt="Team member 2"
                  src="/photos/samantha.quintanchala.jpg"
                  className="object-cover"
                />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold">Samantha Quintanchala</h3>
                <p className="text-muted-foreground">CTO</p>
                <p className="text-sm">
                  Samantha dirige el desarrollo tecnológico de la plataforma
                  Tuto-U, garantizando su seguridad, eficiencia y constante
                  innovación.
                </p>
                <div className="flex gap-2">
                  <Link href="#">
                    <TwitterIcon className="w-4 h-4" />
                  </Link>
                  <Link href="#">
                    <LinkedinIcon className="w-4 h-4" />
                  </Link>
                  <Link href="#">
                    <Github className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
          <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4">
              <Avatar className="w-48 h-48">
                <AvatarImage
                  alt="Team member 3"
                  src="/photos/angie.remache.jpg"
                  className="object-cover"
                />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold">Angie Remache</h3>
                <p className="text-muted-foreground">CMO</p>
                <p className="text-sm">
                  Angie lidera el marketing en Tuto-U, trabajando para aumentar
                  la visibilidad de la marca y atraer nuevos usuarios a través
                  de campañas digitales.
                </p>
                <div className="flex gap-2">
                  <Link href="#">
                    <TwitterIcon className="w-4 h-4" />
                  </Link>
                  <Link href="#">
                    <LinkedinIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
          <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4">
              <Avatar className="w-48 h-48">
                <AvatarImage
                  alt="Team member 4"
                  src="/photos/ariel.pincay.jpg"
                  className="object-cover"
                />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold">Ariel Pincay</h3>
                <p className="text-muted-foreground">CFO</p>
                <p className="text-sm">
                  Ariel maneja las finanzas de Tuto-U, incluyendo la
                  planificación financiera y gestión de riesgos, asegurando la
                  viabilidad económica de la empresa.
                </p>
                <div className="flex gap-2">
                  <Link href="#">
                    <TwitterIcon className="w-4 h-4" />
                  </Link>
                  <Link href="#">
                    <LinkedinIcon className="w-4 h-4" />
                  </Link>
                  <Link href="#">
                    <Github className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

function LinkedinIcon(props:any) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props:any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
