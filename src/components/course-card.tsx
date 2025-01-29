import * as React from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function CourseCard({
  id,
  course,
  school,
}: {
  id: number;
  course: string;
  school: string;
}) {
  return (
    <div
      className="p-8 text-center border flex flex-col items-center rounded-lg justify-between"
      key={course}
    >
      <div className="flex flex-col items-center pb-6 h-full">
        <Image
          src={`/images/${school}.png`}
          alt={`${school} logo`}
          width={100}
          height={100}
        />
        <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight h-full flex items-center">
          {course}
        </h3>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <Link href={`/syllabus/${id}`} className="w-full md:w-auto">
          <Button className="w-full md:w-auto" variant="secondary">
            Ver Syllabus
          </Button>
        </Link>
        <Link href="/request" className="w-full md:w-auto">
          <Button className="w-full md:w-auto">Solicitar tutoría</Button>
        </Link>
      </div>
    </div>
  );
}
