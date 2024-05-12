import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock1,
  MapPin,
  LibraryBig,
  Hourglass,
  Banknote,
} from "lucide-react";
import Image from "next/image";
import { CancelDialog } from "./cancel-dialog";
import { StudentSessionCard } from "@/components/student-session-card"

export function StudentView() {
  const someData = [
    {
      status:"accepted", 
      fullname: "Carlos Andrés Arévalo Torres", 
      photo_url: "carlos.arevalo", 
      course:"Cálculo 1", 
      date:"12 May, 2024", 
      time: "2:00 PM",
      place: "Sala de estudio biblioteca (planta baja)",
      duration: 120, 
      price: 5.00, 
      topic: "Teorema fundamental del Cálculo",
      rawDateTime: new Date("2024-05-12 14:41:50-05")
    },
    {
      status:"accepted", 
      fullname: "Carlos Andrés Arévalo Torres", 
      photo_url: "carlos.arevalo", 
      course:"Cálculo 1", 
      date:"20 May, 2024", 
      time: "4:00 PM",
      place: "Sala de estudio biblioteca (planta baja)",
      duration: 120, 
      price: 5.00, 
      topic: "Límites",
      rawDateTime: new Date("2024-05-20 14:41:50-05")
    },
    {
      status:"requested", 
      fullname: "Carlos Andrés Arévalo Torres", 
      photo_url: "carlos.arevalo", 
      course:"Álgebra Lineal", 
      date:"20 Abr, 2024", 
      time: "6:00 PM",
      place: "B-103",
      duration: 60, 
      price: 2.80, 
      topic: "Espacios Vectoriales",
      rawDateTime: new Date("2024-05-10 14:37:16-08")
    },
    {
      status:"canceled", 
      fullname: "Carlos Andrés Arévalo Torres", 
      photo_url: "carlos.arevalo", 
      course:"Química 2", 
      date:"20 Abr, 2024", 
      time: "6:00 PM",
      place: "Sala de estudio biblioteca (planta alta)",
      duration: 90, 
      price: 3.50, 
      topic: "Química Orgánica",
      rawDateTime: new Date("2024-05-13 07:37:16-08")
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-w-screen-2xl w-full pt-6">
      {someData.map((row, index)=> 
        <StudentSessionCard {...row} key={index}></StudentSessionCard>
      )}
      {/*Esta card es para tutor-view
      <Card>
        <CardHeader>
          <Badge className=" bg-yellow-500 w-fit mb-2">Pendiente</Badge>

          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="/photos/samantha.quintanchala.jpg"
                className=" object-cover"
              />
              <AvatarFallback>SQ</AvatarFallback>
            </Avatar>
            <CardTitle>Samantha Quintanchala</CardTitle>
          </div>
          <CardDescription className="w-fit text-foreground rounded-md bg-background/40 text-base px-2">
            Cálculo 1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 rounded-md bg-background/40 py-2 mb-2 w-fit">
          <div className="flex space-x-2">
            <Calendar />
            <p>20 Abr, 2024</p>
          </div>
          <div className="flex space-x-2">
            <Clock1 />
            <p> 4:00 - 6:00 PM</p>
          </div>
          <div className="flex space-x-2">
            <MapPin />
            <p>Sala de estudio biblioteca (planta baja)</p>
          </div>
          <div className="flex space-x-2">
            <LibraryBig />
            <p>Teorema fundamental del Cálculo</p>
          </div>
          <div className="flex space-x-2">
            <Hourglass />
            <p>2 horas</p>
          </div>
          <div className="flex space-x-2">
            <Banknote /> <p>$5.00</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary">Rechazar</Button>
          <Button>Aceptar</Button>
        </CardFooter>
      </Card>
            */}
    </div>
  );
}
