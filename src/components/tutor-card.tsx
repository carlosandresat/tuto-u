import * as React from "react";
import { Star, StarHalf } from "lucide-react";

import { AchievementsDialogFull } from "@/components/achievements-dialog-full";
import Image from "next/image";
import { SoonButton } from "@/components/soon-button";
import { AchievementsDialog } from "@/components/achievements-dialog";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

function DrawStar({ raiting }: { raiting: number }) {
  const numStar = raiting | 0;
  const isOdd = raiting % 1 >= 0.5 ? true : false;
  return (
    <>
      {[...Array(numStar | 0)].map((_, i) => {
        return <Star key={i} className="size-6 fill-yellow-200"></Star>;
      })}
      {isOdd && <StarHalf className="size-6 fill-yellow-200"></StarHalf>}
    </>
  );
}

export function TutorCard({
  id,
  tutor,
  rating,
  pic_url,
  nreviews,
}: {
  id: string;
  tutor: string;
  rating: number;
  pic_url: string;
  nreviews: number;
}) {
  return (
    <Card className="flex flex-col items-center text-center h-full justify-between transition-all duration-300 hover:shadow-lg" key={tutor}>
      <CardHeader className="flex flex-col items-center pb-2 pt-6">
        <Image
          src={pic_url}
          alt={`${tutor} pic`}
          width={200}
          height={200}
          className="rounded-full object-cover size-48"
        />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center py-4 w-full">
        <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
          {tutor}
        </CardTitle>
        <div className="flex w-full justify-center gap-1 my-2">
          <DrawStar raiting={rating} />
        </div>
        <p className="scroll-m-20 text-lg font-semibold tracking-tight text-foreground flex items-center justify-center my-2">
          {rating % 1 === 0 ? rating : rating.toFixed(1)}{" "}
          <span className="text-xs pl-1">/ 5</span>{" "}
          <span className="text-xs text-muted-foreground pl-2">
            ({nreviews} reviews)
          </span>
        </p>
      </CardContent>
      <CardFooter className="w-full p-6 pt-0 flex justify-center">
        <AchievementsDialog userId={id} />
      </CardFooter>
    </Card>
  );
}
