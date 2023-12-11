import * as React from "react"
 
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
 
export function CourseCard({course, school}:{course:string, school:string}) {
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
            <Link href="/request">
            <Button className="w-full md:w-auto">Solicitar tutoría </Button>
            </Link>
          </div>
  )
}
