"use client";

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
import { getUserAchievements } from "@/actions/achievements-data";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { AchievementCard } from "@/components/achievement-card";
import { usePathname } from "next/navigation";
import { getUserById } from "@/actions/profile";

export function AchievementsDialog({ userId }: { userId: string }) {
  const [achievements, setAchievements] = useState<
    {
      id: number;
      name: string;
      description: string;
      tier: string;
      imageUrl: string;
      userCount: number;
      isInverted: boolean;
    }[]
  >([]);
  const [userTag, setUserTag] = useState<string>("not-found");
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full md:w-auto"
          onClick={() =>
            startTransition(async () => {
              const userAchievements = await getUserAchievements(userId);
              const user = await getUserById(userId);
              setAchievements(userAchievements);
              setUserTag(user);
            })
          }
        >
          Ver Logros
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logros</DialogTitle>
          <DialogDescription>
            Logros obtenidos por este usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-6 max-w-screen-2xl mt-6 justify-center">
          {achievements.map((row, index) => (
            <AchievementCard
              {...row}
              key={index}
              pathname={pathname}
            ></AchievementCard>
          ))}
        </div>

        <DialogFooter className="sm:justify-end flex flex-col">
          <Button className="w-full" disabled={isPending} asChild={!isPending}>
            <Link href={`/${userTag}/profile`} className="w-full">
              Ver Perfil
            </Link>
          </Button>
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
