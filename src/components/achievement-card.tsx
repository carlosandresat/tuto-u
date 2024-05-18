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
}: {
  name: string;
  description: string;
  tier: string;
  imageUrl: string;
  userCount: number;
  isInverted: boolean;
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
      <HoverCardContent>
        <div className="flex justify-start my-2 items-center">
          <div className={cn("w-14 h-14 flex items-center mr-2 justify-center bg-yellow-400 rounded-full", tier === "unique"
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
              className={cn(isInverted ? "dark:invert p-1" : "invert p-1")}
              />
          </div>
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
            {name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {userCount} usuarios tienen este logro
        </p>

        <p className="mt-2">{description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
