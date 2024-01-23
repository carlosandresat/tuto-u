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

export function AchievementsDialog() {
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
        <div className="grid grid-cols-1 gap-6 max-w-screen-2xl mt-6 justify-center">

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
