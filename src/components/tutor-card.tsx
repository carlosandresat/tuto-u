import * as React from "react";
import { Car, Star, StarHalf } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

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
          <Star className="h-6 w-6 fill-yellow-200"></Star>
          <Star className="h-6 w-6 fill-yellow-200"></Star>
          <Star className="h-6 w-6 fill-yellow-200"></Star>
          <Star className="h-6 w-6 fill-yellow-200"></Star>
          <StarHalf className="h-6 w-6 fill-yellow-200"></StarHalf>
        </div>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight h-full flex items-center">
          {rating} <span className="text-muted-foreground pl-2">({nreviews} reviews)</span>
        </h3>
      </div>
      <Button className="w-full md:w-auto">Ver perfil</Button>
    </div>
  );
}
