import * as React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

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
    <Card className="flex flex-col items-center text-center h-full justify-between transition-all duration-300 hover:shadow-lg" key={course}>
      <CardHeader className="flex flex-col items-center pb-2 pt-6">
        <Image
          src={`/images/${school}.png`}
          alt={`${school} logo`}
          width={100}
          height={100}
          className="object-contain"
        />
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center py-4">
        <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
          {course}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 w-full p-6 pt-0">
        <Button asChild className="w-full" variant="secondary">
          <Link href={`/syllabus/${id}`}>
            Ver Syllabus
          </Link>
        </Button>
        <Button asChild className="w-full">
          <Link href="/request">
            Solicitar tutoría
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
