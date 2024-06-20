import { StartNavbar } from "@/components/start-navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

import Link from "next/link";
import { Github } from "lucide-react";

export default function OurTeam() {
  return (
    <>
      <StartNavbar />

      <section className="pt-40 pb-12 w-full flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl">
          Nuestro Equipo
        </h2>
        <p className="scroll-m-20 text-muted-foreground max-w-screen-2xl text-left md:text-center p-8">
          Conoce a las increíbles personas que han contribuido al desarrollo y
          al éxito de Tuto-U. Cada colaborador ha desempeñado un papel único,
          desde el desarrollo técnico hasta la orientación estratégica,
          ayudándonos a crecer y a llegar a más estudiantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 max-w-screen-xl p-8 w-full">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative group hover:cursor-pointer">
                    <Avatar className="w-48 h-48 transition duration-300 ease-in-out group-hover:blur-sm ">
                      <AvatarImage
                        alt="Team member 1"
                        src="/photos/carlos.arevalo.jpg"
                        className="object-cover"
                      />
                      <AvatarFallback>CA</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                      <span className="text-xl font-semibold bg-background/20 p-2 rounded-full">
                        Ver más...
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Próximamente</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold text-center">
                  Carlos Arévalo
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative group hover:cursor-pointer">
                    <Avatar className="w-48 h-48 transition duration-300 ease-in-out group-hover:blur-sm ">
                      <AvatarImage
                        alt="Team member 2"
                        src="/photos/samantha.quintanchala.jpg"
                        className="object-cover"
                      />
                      <AvatarFallback>SQ</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                      <span className="text-xl font-semibold bg-background/20 p-2 rounded-full">
                        Ver más...
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Próximamente</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold text-center">
                  Samantha Quintanchala
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative group hover:cursor-pointer">
                    <Avatar className="w-48 h-48 transition duration-300 ease-in-out group-hover:blur-sm ">
                      <AvatarImage
                        alt="Team member 3"
                        src="/photos/angie.remache.jpg"
                        className="object-cover"
                      />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                      <span className="text-xl font-semibold bg-background/20 p-2 rounded-full">
                        Ver más...
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Próximamente</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold text-center">Angie Remache</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative group hover:cursor-pointer">
                    <Avatar className="w-48 h-48 transition duration-300 ease-in-out group-hover:blur-sm ">
                      <AvatarImage
                        alt="Team member 4"
                        src="/photos/ariel.pincay.jpg"
                        className="object-cover"
                      />
                      <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                      <span className="text-xl font-semibold bg-background/20 p-2 rounded-full">
                        Ver más...
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Próximamente</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold text-center">Ariel Pincay</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="py-12 w-full flex items-center justify-center flex-col bg-secondary">
        <h2 className="scroll-m-20 border-b border-muted-foreground pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl">
          Nuestros Partners
        </h2>
        <p className="scroll-m-20 text-muted-foreground max-w-screen-2xl text-center p-8">
        Estamos orgullosos de colaborar con diversas organizaciones que comparten nuestra visión de una educación colaborativa. Desde instituciones académicas hasta grupos o asociaciones que mejoran nuestras capacidades y amplían nuestro alcance
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 max-w-screen-xl p-8 w-full">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative group hover:cursor-pointer">
                    <Avatar className="w-48 h-48 transition duration-300 ease-in-out group-hover:blur-sm ">
                      <AvatarImage
                        alt="Team member 1"
                        src="/images/yt.png"
                        className="object-cover p-6"
                      />
                      <AvatarFallback>UIEYT</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                      <span className="text-xl font-semibold bg-background/20 p-2 rounded-full">
                        Ver más...
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Próximamente</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold text-center">
                  Universidad Yachay Tech
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative group hover:cursor-pointer">
                    <Avatar className="w-48 h-48 transition duration-300 ease-in-out group-hover:blur-sm ">
                      <AvatarImage
                        alt="Team member 2"
                        src="/images/mentores.jpg"
                        className="object-cover"
                      />
                      <AvatarFallback>MYT</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                      <span className="text-xl font-semibold bg-background/20 p-2 rounded-full">
                        Ver más...
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Próximamente</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div className="space-y-2 p-2">
                <h3 className="text-xl font-bold text-center">
                  Mentores Yachay Tech
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="pt-12 pb-6 w-full flex items-center justify-center flex-col">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl">
          Nuestros Donantes
        </h2>
        <p className="scroll-m-20 text-muted-foreground max-w-screen-2xl text-center p-8">
          Un sincero agradecimiento a todas las personas que han apoyado a
          Tuto-U a través de sus generosas donaciones. Sus contribuciones nos
          ayudan a continuar nuestra misión y ampliar nuestros servicios a los
          estudiantes que lo necesiten
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-8 max-w-screen-xl p-8 w-full items-start">
          <div className="flex flex-col justify-center items-center">
            <Avatar className="w-24 h-24 border-8 border-yellow-500">
              <AvatarImage
                alt="Team member 1"
                src="/photos/placeholder.jpg"
                className="object-cover"
              />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div className="space-y-2 p-2">
              <h3 className="text-xl font-bold text-center">Donante 1</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Avatar className="w-24 h-24 border-8 border-gray-500">
              <AvatarImage
                alt="Team member 1"
                src="/photos/placeholder.jpg"
                className="object-cover"
              />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div className="space-y-2 p-2">
              <h3 className="text-xl font-bold text-center">Donante 2</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Avatar className="w-24 h-24 border-8 border-gray-500">
              <AvatarImage
                alt="Team member 1"
                src="/photos/placeholder.jpg"
                className="object-cover"
              />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div className="space-y-2 p-2">
              <h3 className="text-xl font-bold text-center">Donante 3</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Avatar className="w-24 h-24 border-8 border-yellow-700">
              <AvatarImage
                alt="Team member 1"
                src="/photos/placeholder.jpg"
                className="object-cover"
              />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div className="space-y-2 p-2">
              <h3 className="text-xl font-bold text-center">Donante 4</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Avatar className="w-24 h-24 border-8 border-yellow-700">
              <AvatarImage
                alt="Team member 1"
                src="/photos/placeholder.jpg"
                className="object-cover"
              />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div className="space-y-2 p-2">
              <h3 className="text-xl font-bold text-center">Donante 5</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Avatar className="w-24 h-24 border-8 border-yellow-700">
              <AvatarImage
                alt="Team member 1"
                src="/photos/placeholder.jpg"
                className="object-cover"
              />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
            <div className="space-y-2 p-2">
              <h3 className="text-xl font-bold text-center">Donante 6</h3>
            </div>
          </div>
        </div>
        <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-md">¿Quieres apoyarnos? Averigua cómo aquí</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Gracias por tu apoyo</DialogTitle>
                <DialogDescription>
                  Dona desde $1 y contáctanos por nuestras redes para añadirte en esta sección. Tu donación ayuda mucho a los desarrolladores y el mantenimiento de la aplicación.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center">
                <Image
                  src={`/instructions/howdonate.png`}
                  alt="Restart password instructions"
                  width={900}
                  height={900}
                />
              </div>
            </DialogContent>
          </Dialog>
          
      </section>
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

function LinkedinIcon(props: any) {
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

function TwitterIcon(props: any) {
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
