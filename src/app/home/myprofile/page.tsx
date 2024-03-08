"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function MyProfile() {
  const [durationSelected, setDurationSelected] = useState<string[]>([]);
  return (
    <>
      <section className="w-full py-8 flex items-center justify-center flex-col">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 pt-32">
          Mi Perfil
        </h2>

        <div className="flex max-w-screen-xl w-full p-8 flex-col">
          <Card className="w-full">
            <CardHeader>
              <Image
                src="/photos/carlos.arevalo.jpg"
                alt="Carlos Arévalo"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Carlos Arévalo</CardTitle>
                <p>
                  <span className="font-bold">Carrera:</span> Ingeniería en
                  Tecnologías de la Información
                </p>
                <p>
                  <span className="font-bold">Correo:</span>{" "}
                  <a href="mailto:carlos.arevalo@yachaytech.edu.ec">carlos.arevalo@yachaytech.edu.ec</a>
                </p>
            </CardContent>
            <CardFooter>
              <button className="btn">Editar</button>
            </CardFooter>

          </Card>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Precios</CardTitle>
              <CardDescription>Selecciona la duración de las tutorías con tus precios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 md:space-x-8">

                <ToggleGroup type="multiple" variant="outline" className="lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1" value={durationSelected} onValueChange={setDurationSelected}>
                  <ToggleGroupItem value="1h" aria-label="Toggle 1h"> 1 hora </ToggleGroupItem>
                  <ToggleGroupItem value="1.5h" aria-label="Toggle 1.5h"> 1 hora 30 minutos </ToggleGroupItem>
                  <ToggleGroupItem value="2h" aria-label="Toggle 2h"> 2 horas </ToggleGroupItem>
                  <ToggleGroupItem value="2.5h" aria-label="Toggle 2.5h"> 2 horas 30 minutos </ToggleGroupItem>
                  <ToggleGroupItem value="3h" aria-label="Toggle 3h"> 3 horas </ToggleGroupItem>
                </ToggleGroup>

                <div className="flex items-center justify-center flex-col space-y-2">
                 
                  
                  <div className={`flex items-center justify-center ${!durationSelected.includes("1h") ? "invisible":null}`}>
                    <DollarSign />
                    <Input type="number" className="input" placeholder="Precio" step="0.5" />
                  </div>
                  <div className={`flex items-center justify-center ${!durationSelected.includes("1.5h") ? "invisible":null}`}>
                    <DollarSign />
                    <Input type="number" className="input" placeholder="Precio" step="0.5" />
                  </div>
                  <div className={`flex items-center justify-center ${!durationSelected.includes("2h") ? "invisible":null}`}>
                    <DollarSign />
                    <Input type="number" className="input" placeholder="Precio" step="0.5" />
                  </div>
                  <div className={`flex items-center justify-center ${!durationSelected.includes("2.5h") ? "invisible":null}`}>
                    <DollarSign />
                    <Input type="number" className="input" placeholder="Precio" step="0.5" />
                  </div>
                  <div className={`flex items-center justify-center ${!durationSelected.includes("3h") ? "invisible":null}`}>
                    <DollarSign />
                    <Input type="number" className="input" placeholder="Precio" step="0.5" />
                  </div>
                </div>

              </div>

            </CardContent>
            <CardFooter>
              <Button onClick={ ()=> console.log(durationSelected)}>Guardar</Button>
            </CardFooter>
          </Card>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Asignaturas como tutor</CardTitle>
              <CardDescription>Selecciona las asignaturas a las que quieres ser solicitado para tutorías</CardDescription>
            </CardHeader>
            <CardContent>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="Fisica 1" aria-label="Toggle Física 1"> Física 1 </ToggleGroupItem>
                <ToggleGroupItem value="Fisica 2" aria-label="Toggle Física 2"> Física 2 </ToggleGroupItem>
                <ToggleGroupItem value="Matemáticas 1" aria-label="Toggle Matemáticas 1"> Matemáticas 1 </ToggleGroupItem>
                <ToggleGroupItem value="Matemáticas 2" aria-label="Toggle Matemáticas 2"> Matemáticas 2 </ToggleGroupItem>
                <ToggleGroupItem value="Matemáticas 3" aria-label="Toggle Matemáticas 3"> Matemáticas 3 </ToggleGroupItem>
                <ToggleGroupItem value="Matemáticas 4" aria-label="Toggle Matemáticas 4"> Matemáticas 4 </ToggleGroupItem>
                <ToggleGroupItem value="Matemáticas 5" aria-label="Toggle Matemáticas 5"> Matemáticas 5 </ToggleGroupItem>
                <ToggleGroupItem value="Matemáticas 6" aria-label="Toggle Matemáticas 6"> Matemáticas 6 </ToggleGroupItem>

              </ToggleGroup>
            </CardContent>
            <CardFooter>
              <Button>Guardar</Button>
            </CardFooter>
          </Card>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Horarios disponibles</CardTitle>
              <CardDescription>Selecciona los horarios en los que estás disponible para ofrecer tutorías</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Lunes
              </h3>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="8am" aria-label="Toggle 8am"> 8am </ToggleGroupItem>
                <ToggleGroupItem value="10am" aria-label="Toggle 10am"> 10am </ToggleGroupItem>
                <ToggleGroupItem value="12pm" aria-label="Toggle 2pm"> 12pm </ToggleGroupItem>
                <ToggleGroupItem value="2pm" aria-label="Toggle 2pm"> 2pm </ToggleGroupItem>
                <ToggleGroupItem value="4pm" aria-label="Toggle 4pm"> 4pm </ToggleGroupItem>
                <ToggleGroupItem value="6pm" aria-label="Toggle 6pm"> 6pm </ToggleGroupItem>
                <ToggleGroupItem value="8pm" aria-label="Toggle 8pm"> 8pm </ToggleGroupItem>
                <ToggleGroupItem value="10pm" aria-label="Toggle 10pm"> 10pm </ToggleGroupItem>
              </ToggleGroup>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Martes
              </h3>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="8am" aria-label="Toggle 8am"> 8am </ToggleGroupItem>
                <ToggleGroupItem value="10am" aria-label="Toggle 10am"> 10am </ToggleGroupItem>
                <ToggleGroupItem value="12pm" aria-label="Toggle 2pm"> 12pm </ToggleGroupItem>
                <ToggleGroupItem value="2pm" aria-label="Toggle 2pm"> 2pm </ToggleGroupItem>
                <ToggleGroupItem value="4pm" aria-label="Toggle 4pm"> 4pm </ToggleGroupItem>
                <ToggleGroupItem value="6pm" aria-label="Toggle 6pm"> 6pm </ToggleGroupItem>
                <ToggleGroupItem value="8pm" aria-label="Toggle 8pm"> 8pm </ToggleGroupItem>
                <ToggleGroupItem value="10pm" aria-label="Toggle 10pm"> 10pm </ToggleGroupItem>
              </ToggleGroup>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Miércoles
              </h3>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="8am" aria-label="Toggle 8am"> 8am </ToggleGroupItem>
                <ToggleGroupItem value="10am" aria-label="Toggle 10am"> 10am </ToggleGroupItem>
                <ToggleGroupItem value="12pm" aria-label="Toggle 2pm"> 12pm </ToggleGroupItem>
                <ToggleGroupItem value="2pm" aria-label="Toggle 2pm"> 2pm </ToggleGroupItem>
                <ToggleGroupItem value="4pm" aria-label="Toggle 4pm"> 4pm </ToggleGroupItem>
                <ToggleGroupItem value="6pm" aria-label="Toggle 6pm"> 6pm </ToggleGroupItem>
                <ToggleGroupItem value="8pm" aria-label="Toggle 8pm"> 8pm </ToggleGroupItem>
                <ToggleGroupItem value="10pm" aria-label="Toggle 10pm"> 10pm </ToggleGroupItem>
              </ToggleGroup>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Jueves
              </h3>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="8am" aria-label="Toggle 8am"> 8am </ToggleGroupItem>
                <ToggleGroupItem value="10am" aria-label="Toggle 10am"> 10am </ToggleGroupItem>
                <ToggleGroupItem value="12pm" aria-label="Toggle 2pm"> 12pm </ToggleGroupItem>
                <ToggleGroupItem value="2pm" aria-label="Toggle 2pm"> 2pm </ToggleGroupItem>
                <ToggleGroupItem value="4pm" aria-label="Toggle 4pm"> 4pm </ToggleGroupItem>
                <ToggleGroupItem value="6pm" aria-label="Toggle 6pm"> 6pm </ToggleGroupItem>
                <ToggleGroupItem value="8pm" aria-label="Toggle 8pm"> 8pm </ToggleGroupItem>
                <ToggleGroupItem value="10pm" aria-label="Toggle 10pm"> 10pm </ToggleGroupItem>
              </ToggleGroup>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Viernes
              </h3>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="8am" aria-label="Toggle 8am"> 8am </ToggleGroupItem>
                <ToggleGroupItem value="10am" aria-label="Toggle 10am"> 10am </ToggleGroupItem>
                <ToggleGroupItem value="12pm" aria-label="Toggle 2pm"> 12pm </ToggleGroupItem>
                <ToggleGroupItem value="2pm" aria-label="Toggle 2pm"> 2pm </ToggleGroupItem>
                <ToggleGroupItem value="4pm" aria-label="Toggle 4pm"> 4pm </ToggleGroupItem>
                <ToggleGroupItem value="6pm" aria-label="Toggle 6pm"> 6pm </ToggleGroupItem>
                <ToggleGroupItem value="8pm" aria-label="Toggle 8pm"> 8pm </ToggleGroupItem>
                <ToggleGroupItem value="10pm" aria-label="Toggle 10pm"> 10pm </ToggleGroupItem>
              </ToggleGroup>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Sábado
              </h3>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="8am" aria-label="Toggle 8am"> 8am </ToggleGroupItem>
                <ToggleGroupItem value="10am" aria-label="Toggle 10am"> 10am </ToggleGroupItem>
                <ToggleGroupItem value="12pm" aria-label="Toggle 2pm"> 12pm </ToggleGroupItem>
                <ToggleGroupItem value="2pm" aria-label="Toggle 2pm"> 2pm </ToggleGroupItem>
                <ToggleGroupItem value="4pm" aria-label="Toggle 4pm"> 4pm </ToggleGroupItem>
                <ToggleGroupItem value="6pm" aria-label="Toggle 6pm"> 6pm </ToggleGroupItem>
                <ToggleGroupItem value="8pm" aria-label="Toggle 8pm"> 8pm </ToggleGroupItem>
                <ToggleGroupItem value="10pm" aria-label="Toggle 10pm"> 10pm </ToggleGroupItem>
              </ToggleGroup>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Domingo
              </h3>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="8am" aria-label="Toggle 8am"> 8am </ToggleGroupItem>
                <ToggleGroupItem value="10am" aria-label="Toggle 10am"> 10am </ToggleGroupItem>
                <ToggleGroupItem value="12pm" aria-label="Toggle 2pm"> 12pm </ToggleGroupItem>
                <ToggleGroupItem value="2pm" aria-label="Toggle 2pm"> 2pm </ToggleGroupItem>
                <ToggleGroupItem value="4pm" aria-label="Toggle 4pm"> 4pm </ToggleGroupItem>
                <ToggleGroupItem value="6pm" aria-label="Toggle 6pm"> 6pm </ToggleGroupItem>
                <ToggleGroupItem value="8pm" aria-label="Toggle 8pm"> 8pm </ToggleGroupItem>
                <ToggleGroupItem value="10pm" aria-label="Toggle 10pm"> 10pm </ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
            <CardFooter>
              <Button>Guardar</Button>
            </CardFooter>
          </Card>

        </div>
      </section>
    </>
  );
}
