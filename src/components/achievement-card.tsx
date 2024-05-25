import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function AchievementCard({
  name,
  description,
  tier,
  imageUrl,
  userCount,
  isInverted,
  pathname,
}: {
  name: string;
  description: string;
  tier: string;
  imageUrl: string;
  userCount: number;
  isInverted: boolean;
  pathname: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger className="flex justify-center">
        <Button
          className={cn(
            "w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help",
            tier === "unique"
              ? ""
              : tier === "bronze"
              ? "bg-amber-950 hover:bg-amber-950/80"
              : tier === "silver"
              ? "bg-gray-400 hover:bg-gray-400/80"
              : tier === "gold"
              ? "bg-yellow-400 hover:bg-yellow-400/80"
              : tier === "secret"
              ? "bg-grid hover:bg-grid"
              : null
          )}
          variant="outline"
        >
          <Image
            src={`/achievements/${imageUrl}`}
            alt={`${name} image`}
            width={64}
            height={64}
            className={cn(isInverted ? "dark:invert" : "invert")}
          />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className={cn(tier === "secret" ? "bg-grid" : null)}>
        <div className="flex justify-start my-2 items-center">
          <div className={cn("p-3 flex items-center mr-2 justify-center bg-yellow-400 rounded-full", tier === "unique" || tier === "secret"
              ? "bg-secondary"
              : tier === "bronze"
              ? "bg-amber-950"
              : tier === "silver"
              ? "bg-gray-400 "
              : tier === "gold"
              ? "bg-yellow-400"
              : null)}>
            <Image
              src={`/achievements/${imageUrl}`}
              alt={`${name} image`}
              width={40}
              height={40}
              className={cn(isInverted ? "dark:invert" : "invert p-1")}
              />
          </div>
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
            {name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {userCount} usuarios tienen este logro
        </p>

        <p className="mt-2">{tier === "secret" && pathname !== "/home/myprofile" ? "Logro secreto. ¡Desbloquéalo para conocer la descripción!" : description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
