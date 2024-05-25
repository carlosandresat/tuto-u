import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

export function AchievementsDialogFull() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">Ver Logros</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logros</DialogTitle>
          <DialogDescription>
            Logros obtenidos por este usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-6 max-w-screen-2xl mt-6 justify-center">
        <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help bg-yellow-400 hover:bg-yellow-400/80"
                variant="outline"
              >
                <Image
                  src="/achievements/student.png"
                  alt="student"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-yellow-400 rounded-full">
                  <Image
                    src="/achievements/student.png"
                    alt="student"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                  Estudiante de Oro
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
                Has asistido a 30 tutorías. ¡Felicidades!
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help bg-gray-400 hover:bg-gray-400/80"
                variant="outline"
              >
                <Image
                  src="/achievements/student.png"
                  alt="student"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-gray-400 rounded-full">
                  <Image
                    src="/achievements/student.png"
                    alt="student"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                  Estudiante de Plata
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
                Has asistido a 15 tutorías. ¡Felicidades!
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help bg-amber-950 hover:bg-amber-950/80"
                variant="outline"
              >
                <Image
                  src="/achievements/student.png"
                  alt="student"
                  width={64}
                  height={64}
                  className="invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-amber-950 rounded-full">
                  <Image
                    src="/achievements/student.png"
                    alt="student"
                    width={40}
                    height={40}
                    className="invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                  Estudiante de Bronze
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
                Has asistido a 5 tutorías. ¡Felicidades!
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help bg-yellow-400 hover:bg-yellow-400/80"
                variant="outline"
              >
                <Image
                  src="/achievements/tutor.png"
                  alt="student"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-yellow-400 rounded-full">
                  <Image
                    src="/achievements/tutor.png"
                    alt="student"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                  Tutor de Oro
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
                Has realizado 30 tutorías. ¡Felicidades!
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help bg-gray-400 hover:bg-gray-400/80"
                variant="outline"
              >
                <Image
                  src="/achievements/tutor.png"
                  alt="student"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-gray-400 rounded-full">
                  <Image
                    src="/achievements/tutor.png"
                    alt="student"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                  Tutor de Plata
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
                Has realizado 15 tutorías. ¡Felicidades!
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help bg-amber-950 hover:bg-amber-950/80"
                variant="outline"
              >
                <Image
                  src="/achievements/tutor.png"
                  alt="tutor"
                  width={64}
                  height={64}
                  className="invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-amber-950 rounded-full">
                  <Image
                    src="/achievements/tutor.png"
                    alt="tutor"
                    width={40}
                    height={40}
                    className="invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                  Tutor de Bronze
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
                Has realizado 5 tutorías. ¡Felicidades!
              </p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help"
                variant="outline"
              >
                <Image
                  src="/achievements/follow.png"
                  alt="medalla"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-secondary rounded-full">
                  <Image
                    src="/achievements/follow.png"
                    alt="medalla"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                  Seguidor Fiel
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
                Eres seguidor de las redes sociales de Tuto-U. ¡Gracias!
              </p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help"
                variant="outline"
              >
                <Image
                  src="/achievements/pre-release-access.png"
                  alt="Pre-Release"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-secondary rounded-full">
                  <Image
                    src="/achievements/pre-release-access.png"
                    alt="Pre-Release"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                Usurio Pre-Registrado
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
              Eres un usuario que ha completado el Pre-Registro de
                      Tuto-U. ¡Gracias!
              </p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help"
                variant="outline"
              >
                <Image
                  src="/achievements/bug.png"
                  alt="Pre-Release"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-secondary rounded-full">
                  <Image
                    src="/achievements/bug.png"
                    alt="Pre-Release"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                Caza-Bichos
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
              Has reportado un bug de la plataforma ¡Gracias por tu colaboración!
              </p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help"
                variant="outline"
              >
                <Image
                  src="/achievements/graduate.png"
                  alt="Pre-Release"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-secondary rounded-full">
                  <Image
                    src="/achievements/graduate.png"
                    alt="Pre-Release"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                Graduado
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
              Eres alguien que terminó la carrera y ahora tienes un título universitario. ¡Felicidades por tu esfuerzo!
              </p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help"
                variant="outline"
              >
                <Image
                  src="/achievements/rocket.png"
                  alt="Pre-Release"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-grid">
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-secondary rounded-full">
                  <Image
                    src="/achievements/rocket.png"
                    alt="Pre-Release"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                El Inicio
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>

              <p className="mt-2">
              Has iniciado tu camino en Tuto-U. Completaste todos los pasos desde solicitar hasta calificar tu primera tutoría. ¡Este es tu primer paso!
              </p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="flex justify-center">
              <Button
                className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help bg-grid hover:bg-grid"
                variant="outline"
              >
                <Image
                  src="/achievements/narcissism.png"
                  alt="Pre-Release"
                  width={64}
                  height={64}
                  className="dark:invert"
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-grid">
              <div className="flex justify-start my-2 items-center">
                <div className="w-14 h-14 flex items-center mr-2 justify-center bg-secondary rounded-full">
                  <Image
                    src="/achievements/narcissism.png"
                    alt="Pre-Release"
                    width={40}
                    height={40}
                    className="dark:invert p-1"
                  />
                </div>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                Narcisista
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
              </p>
              <p className="mt-2">
              Logro secreto. ¡Desbloquéalo para conocer la descripción!
              </p>
            </HoverCardContent>
          </HoverCard>

        </div>

        <DialogFooter className="sm:justify-end flex flex-col">
            <Link href="#" className="w-full">
                <Button className="w-full">Ver Perfil</Button>
            </Link>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
