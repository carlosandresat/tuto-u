import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfilePricingForm } from "@/components/profile-pricing-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { ProfileCoursesForm } from "@/components/profile-courses-form";
import { auth } from "@/auth";
import { getUserPricing, getUserData } from "@/actions/user-configuration";

export default async function MyProfile() {
  const session = await auth()
  const pricingConfig = await getUserPricing(session?.user?.id || "")
  const userBasicData = await getUserData(session?.user?.id || "")
  let initials
  if (userBasicData && userBasicData.firstname && userBasicData.lastname){
    initials = `${Array.from(userBasicData.firstname)[0]}${Array.from(userBasicData.lastname)[0]}`
  }

  const courses = [
    { id: 1, course: "Cálculo 1" },
    { id: 2, course: "Cálculo 2" },
    { id: 3, course: "Cálculo 3" },
    { id: 4, course: "Algebra Lineal" },
    { id: 5, course: "Química 1" },
    { id: 6, course: "Química 2" },
    { id: 7, course: "Física 1" },
    { id: 8, course: "Física 2" },
    { id: 9, course: "Biología 1" },
    { id: 10, course: "Biología 2" },
    { id: 11, course: "Ciencias de la Tierra" },
    { id: 12, course: "Probabilidad y Estadística" },
    { id: 13, course: "Introducción a la Programación" },
    { id: 14, course: "Ecuaciones Diferenciales" },
    { id: 15, course: "Métodos Numéricos" },
    { id: 16, course: "Inglés" },
  ];
  
  
  
  return (
    <>
      <section className="w-full py-8 flex items-center justify-center flex-col">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 pt-32">
          Mi Perfil
        </h2>

        <div className="flex max-w-screen-xl w-full p-8 flex-col">
          <Card className="w-full">
            <CardHeader>
              <Avatar className="w-24 h-24">
                <AvatarImage src={`/photos/${userBasicData?.email?.split("@")[0]}.jpg`}/>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <CardTitle>{`${userBasicData?.firstname} ${userBasicData?.lastname}`}</CardTitle>
                <p>
                  <span className="font-bold">Correo:{" "}</span>
                  <a href={`mailto:${userBasicData?.email}`} className=" hover:border-b border-foreground">{userBasicData?.email}</a>
                </p>
            </CardContent>

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
              <ProfileCoursesForm userId={session?.user?.id} coursesConfig={courses}></ProfileCoursesForm>
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
