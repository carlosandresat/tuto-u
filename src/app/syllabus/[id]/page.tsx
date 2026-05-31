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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Megaphone } from "lucide-react";
import { PageContainer } from "@/components/page-container";
import { SyllabusContributeButton } from "@/components/syllabus-contribute-button";

function getSyllabusLastUpdate(id: number): string {
  // Cálculo I (1), Álgebra Lineal (4), Química I (5), Biología I (9) se agregaron en Julio 2024
  if ([1, 4, 5, 9].includes(id)) {
    return "Julio 2024";
  }
  // El resto de materias se agregaron en Febrero 2025
  return "Febrero 2025";
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  const resolvedParams = await params;
  const syllabus = syllabusData.find((s) => s.id === parseInt(resolvedParams.id));

  if (!syllabus) {
    return (
      <PageContainer size="xl" clearNavbar={false} className="min-h-screen justify-center">
        <Link
          href={session?.user ? "/home" : "/"}
          className="absolute top-0 left-0 m-6"
        >
          <Button variant="link">
            <ArrowLeft className="mr-2" /> Regresar
          </Button>
        </Link>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-full text-left">
          Syllabus no encontrado
        </h1>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer size="xl" clearNavbar={false} className="min-h-screen">
        <Link href={session?.user ? "/home" : "/"} className="self-start">
          <Button variant="link" className="px-0">
            <ArrowLeft className="mr-2" /> Regresar
          </Button>
        </Link>
        <div className="flex flex-col w-full py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full border-b pb-6 mb-8">
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-left">
                {syllabus.classname}
              </h1>
              <p className="text-sm text-muted-foreground">
                Última actualización: {getSyllabusLastUpdate(syllabus.id)}
              </p>
            </div>
            <SyllabusContributeButton className="shrink-0" />
          </div>
          <p className="text-md text-muted-foreground w-full text-left">
            {syllabus.description}
          </p>

          <Accordion
            type="single"
            collapsible
            className="w-full mt-8"
          >
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
      </PageContainer>
    </>
  );
}
