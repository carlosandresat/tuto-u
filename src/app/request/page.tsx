import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Component() {
  return (
    <>
      <section className="md:min-h-screen w-full p-6 md:p-12 items-center justify-center flex">
        {/* Button Back */}
        <Link href="/inicio" className="fixed top-0 left-0 p-6">
          <Button variant="link">
            <ArrowLeft className="mr-2"/> Regresar
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
              <div className="space-y-2">
                <Label htmlFor="course">Curso</Label>
                <Input id="course" placeholder="Enter course name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" placeholder="Choose a date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input id="time" placeholder="Choose a time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="place">Lugar</Label>
                <Input id="place" placeholder="Enter location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Tema</Label>
                <Input id="topic" placeholder="Enter topic for the session" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-max">Solicitar tutoría</Button>
            </CardFooter>
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
                  <Badge className=" bg-yellow-400">Premium</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Tutor description goes here. This is a brief introduction of
                  the tutor.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="#" className="flex justify-center w-full">
                <Button variant="secondary" className="w-full md:w-auto">
                  Ver perfil
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
