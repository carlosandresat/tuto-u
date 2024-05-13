
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IndividualSessionRequestSchema } from "@/schemas";
import { AchievementsDialog } from "@/components/achievements-dialog";
import { IndividualSessionForm } from "@/components/individual-session-form";


export default function Component() {
  return (
    <>
      <section className="md:min-h-screen w-full p-6 md:p-12 items-center justify-center flex">
        {/* Button Back */}
        <Link href="/home" className="absolute top-0 left-0 p-6">
          <Button variant="link">
            <ArrowLeft className="mr-2" /> Regresar
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row gap-6 max-w-screen-2xl w-full mt-12">
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <CardTitle>Solicitar Tutoría</CardTitle>
              <CardDescription>
                Llena los siguientes campos para solicitar una tutoría.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <IndividualSessionForm></IndividualSessionForm>
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Detalles del tutor</CardTitle>
              <CardDescription>
                Información acerca del tutor seleccionado.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src="/photos/carlos.arevalo.jpg"
                  alt="Carlos Arévalo"
                ></AvatarImage>
                <AvatarFallback className="text-3xl">CA</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Tutor Name</h2>
                <div className="flex justify-center items-center mt-2 gap-x-2 flex-wrap gap-y-2">
                  <Badge className="">Rating: 4.7</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Aquí viene la descripción del tutor. Esta es una breve
                  descripción del tutor.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <AchievementsDialog></AchievementsDialog>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
