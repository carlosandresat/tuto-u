"use client"

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
import { useState, useEffect } from "react";
import { AchievementCard } from "@/components/achievement-card";

export function AchievementsDialog({userId}:{userId:string}) {
  const [achievements, setAchievements] = useState<{ id: number; name: string; description: string; tier: string; imageUrl: string; userCount: number; isInverted: boolean; }[]>([])

  useEffect(() => {
    const loadAchievements = async () => {
      const userAchievements = await getUserAchievements(userId)
      setAchievements(userAchievements)
    }
 
    loadAchievements()
  }, [userId])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto" onClick={async ()=> {
      const res = await getUserAchievements(userId)
      setAchievements(res)
    }}>Ver Logros</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logros</DialogTitle>
          <DialogDescription>
            Logros obtenidos por este usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-6 max-w-screen-2xl mt-6 justify-center">
          {achievements.map((row, index)=>
          <AchievementCard {...row} key={index}></AchievementCard>
          )}
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
