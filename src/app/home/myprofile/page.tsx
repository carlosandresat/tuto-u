import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfilePricingForm } from "@/components/profile-pricing-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { auth } from "@/auth";
import { getUserPricing } from "@/actions/user-configuration";

export default async function MyProfile() {
  const session = await auth()
  const pricingConfig = await getUserPricing(session?.user?.id || "")
  
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
              <ProfilePricingForm userId={session?.user?.id || ""} pricingConfig={JSON.parse(JSON.stringify(pricingConfig))}></ProfilePricingForm>

            </CardContent>
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
