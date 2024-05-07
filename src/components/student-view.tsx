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

export function StudentView() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-w-screen-2xl w-full pt-6">
      <Card>
        <CardHeader>
          <Badge className=" bg-green-500 w-fit mb-2">Aceptada</Badge>

          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="/photos/carlos.arevalo.jpg"
                className=" object-cover"
              />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <CardTitle className="rounded-md bg-background/40">
              Carlos Arévalo
            </CardTitle>
          </div>
          <CardDescription className="text-base text-foreground backdrop-blur-sm rounded-md w-fit px-2 bg-background/40">
            Cálculo 1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 py-2  rounded-md w-fit bg-background/40 mb-2">
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
        <CardFooter className="flex justify-between items-center space-x-2">
          <Button variant="secondary">Reportar</Button>
          <Button>
            Calificar por 20
            <Image
              src="/images/tuto-gem.png"
              alt="tuto-gem"
              width={25}
              height={25}
              className="ml-2"
            />
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Badge className=" bg-green-500 w-fit mb-2">Aceptada</Badge>

          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="/photos/carlos.arevalo.jpg"
                className=" object-cover"
              />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <CardTitle className="rounded-md bg-background/40">
              Carlos Arévalo
            </CardTitle>
          </div>
          <CardDescription className="text-base px-2">
            Cálculo 1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
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
        <CardFooter className="flex justify-between items-center">
          <Button variant="secondary">Cancelar</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Badge className=" bg-yellow-500 w-fit mb-2">Pendiente</Badge>

          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="/photos/carlos.arevalo.jpg"
                className=" object-cover"
              />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <CardTitle className="rounded-md bg-background/40">
              Carlos Arévalo
            </CardTitle>
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
          <CancelDialog />
        </CardFooter>
      </Card>
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


      <Card>
        <CardHeader>
          <Badge className=" bg-destructive w-fit mb-2 dark:text-foreground hover:dark:text-background">
            Cancelada
          </Badge>

          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/photos/carlos.arevalo.jpg" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <CardTitle className="bg-background/40 rounded-md">
              Carlos Arévalo
            </CardTitle>
          </div>
          <CardDescription className="text-base rounded-md w-fit bg-background/40 text-foreground px-2">
            Cálculo 1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2  bg-background/40 py-2 rounded-md w-fit">
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
        <CardFooter className="flex justify-between items-center"></CardFooter>
      </Card>
    </div>
  );
}
