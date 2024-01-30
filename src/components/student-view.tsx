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
            <CardTitle>Carlos Arévalo</CardTitle>
          </div>
          <CardDescription className="text-base">Cálculo 1</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Calendar />
            <p>30 Ene, 2024</p>
          </div>
          <div className="flex space-x-2">
            <Clock1 />
            <p> 2:00PM - 3:30PM</p>
          </div>
          <div className="flex space-x-2">
            <MapPin />
            <p>Aula B-104</p>
          </div>
          <div className="flex space-x-2">
            <LibraryBig />
            <p>Teorema fundamental del Cálculo</p>
          </div>
          <div className="flex space-x-2">
            <Hourglass />
            <p>1.5 horas</p>
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
              <AvatarImage src="/photos/samantha.quintanchala.jpg" />
              <AvatarFallback>SQ</AvatarFallback>
            </Avatar>
            <CardTitle>Samantha Quintanchala</CardTitle>
          </div>
          <CardDescription className="text-base">Cálculo 2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Calendar />
            <p>25 Feb, 2024</p>
          </div>
          <div className="flex space-x-2">
            <Clock1 />
            <p>8:00PM - 9:00PM</p>
          </div>
          <div className="flex space-x-2">
            <MapPin />
            <p>Segundo piso de la biblioteca</p>
          </div>
          <div className="flex space-x-2">
            <LibraryBig />
            <p>Integrales dobles</p>
          </div>
          <div className="flex space-x-2">
            <Hourglass />
            <p>1 hora</p>
          </div>
          <div className="flex space-x-2">
            <Banknote /> <p>Gratuita</p>
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
              <AvatarImage src="/photos/angie.remache.jpg" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <CardTitle>Angie Remache</CardTitle>
          </div>
          <CardDescription className="text-base">Biología 2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Calendar />
            <p>28 Feb, 2024</p>
          </div>
          <div className="flex space-x-2">
            <Clock1 />
            <p> 10:00AM - 12:00PM</p>
          </div>
          <div className="flex space-x-2">
            <MapPin />
            <p>Online</p>
          </div>
          <div className="flex space-x-2">
            <LibraryBig />
            <p>Ciclo de Krebs</p>
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
          <Button variant="secondary">Cancelar</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Badge className=" bg-blue-500 w-fit mb-2">Cambios propuestos</Badge>

          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="/photos/ariel.pincay.jpg"
                className=" object-cover"
              />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <CardTitle>Ariel Pincay</CardTitle>
          </div>
          <CardDescription className="text-base">
            Ecuaciones Direfenciales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Calendar />
            <p>29 Feb, 2024</p>
          </div>
          <div className="flex space-x-2">
            <Clock1 />
            <p> 4:00PM - 6:30PM</p>
          </div>
          <div className="flex space-x-2">
            <MapPin />
            <p>Aula I-203</p>
          </div>
          <div className="flex space-x-2">
            <LibraryBig />
            <p>Ecuaciones Diferenciales de orden superior</p>
          </div>
          <div className="flex space-x-2">
            <Hourglass />
            <p>2.5 horas</p>
          </div>
          <div className="flex space-x-2">
            <Banknote /> <p>Gratuita</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button>Revisar</Button>
        </CardFooter>
      </Card>

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
            <CardTitle>Carlos Arévalo</CardTitle>
          </div>
          <CardDescription className="text-base">Física 2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Calendar />
            <p>1 Mar, 2024</p>
          </div>
          <div className="flex space-x-2">
            <Clock1 />
            <p> 10:00AM - 12:00PM</p>
          </div>
          <div className="flex space-x-2">
            <MapPin />
            <p>Aula B-102</p>
          </div>
          <div className="flex space-x-2">
            <LibraryBig />
            <p>Circuitos eléctricos</p>
          </div>
          <div className="flex space-x-2">
            <Hourglass />
            <p>2 horas</p>
          </div>
          <div className="flex space-x-2">
            <Banknote /> <p>$7.00</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center"></CardFooter>
      </Card>
    </div>
  );
}
