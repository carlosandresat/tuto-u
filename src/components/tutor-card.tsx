import * as React from "react";
import { Star, StarHalf } from "lucide-react";

import { AchievementsDialogFull } from "@/components/achievements-dialog-full";
import Image from "next/image";

function DrawStar({raiting}:{raiting:number}){
  const numStar = (raiting|0);
  const isOdd = raiting%1>=0.5?true:false;
  return(
    <>
    {
      [...Array(numStar|0)].map((_,i)=>{
        return(
          <Star key={i} className="h-6 w-6 fill-yellow-200"></Star>
        )
      })
    }
    {
      isOdd&&
      <StarHalf className="h-6 w-6 fill-yellow-200"></StarHalf>
    }
    </>
  )
}

export function TutorCard({
  tutor,
  rating,
  pic_url,
  nreviews,
}: {
  tutor: string;
  rating: number;
  pic_url: string;
  nreviews: number;
}) {
  return (
    <div
      className="p-8 text-center border flex flex-col items-center rounded-lg justify-between"
      key={tutor}
    >
      <div className="flex flex-col items-center pb-6 h-full">
        <Image
          src={pic_url}
          alt={`${tutor} pic`}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight h-full flex items-center">
          {tutor}
        </h3>
        <div className="flex w-full justify-center">
          <DrawStar raiting={rating}/>
        </div>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight h-full flex items-center">
          {rating%1 === 0 ? rating : rating.toFixed(1)} <span className=" text-sm pl-1">/ 5</span> <span className="text-muted-foreground pl-2">({nreviews} reviews)</span>
        </h3>
      </div>
      <AchievementsDialogFull/>
    </div>
  );
}
