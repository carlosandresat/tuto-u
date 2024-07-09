import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { syllabusData } from "@/data/syllabus";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth()

    const syllabus = syllabusData.find(s => s.id === parseInt(params.id));

    if (!syllabus) {
      return (
        <section className="min-h-screen w-full p-6 md:p-12 items-center justify-center flex flex-col">
          {/* Button Back */}
          <Link href={session?.user ? "/home" : "/"} className="absolute top-0 left-0 m-6">
            <Button variant="link">
              <ArrowLeft className="mr-2" /> Regresar
            </Button>
          </Link>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-16">
            Syllabus not found
          </h1>
        </section>
      );
    }
  
    return (
      <>
        <section className="min-h-screen w-full p-6 md:p-12 items-center justify-start flex flex-col">
          {/* Button Back */}
          <Link href={session?.user ? "/home" : "/"} className="self-start">
            <Button variant="link">
              <ArrowLeft className="mr-2" /> Regresar
            </Button>
          </Link>
          <div className="flex flex-col justify-center items-center justify-self-stretch min-h-[calc(100vh-150px)] py-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {syllabus.classname}
          </h1>
          <p className="text-md text-muted-foreground max-w-4xl mt-4">
            {syllabus.description}
          </p>
  
          <Accordion type="single" collapsible className="w-full max-w-4xl mt-8">
            {syllabus.units.map((unit, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="border rounded-md px-4">
                  <div className="flex items-center gap-4 justify-start w-full">
                    <div className="flex items-center">
                      <div className="-rotate-90 text-primary font-medium whitespace-nowrap text-sm">
                        U.C. {index + 1}
                      </div>
                    </div>
                    <div className="self-center w-full">
                      <h3 className="text-lg font-medium">{unit.name}</h3>
                      
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-secondary border rounded">
                  <div className="space-y-4 p-8">
                    {unit.topics.map((topic, topicIndex) => (
                      <div key={topicIndex}>
                        <h4 className="font-semibold">{topic.name}</h4>
                        <p>{topic.description}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
        </section>
      </>
    );
  }