import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfilePricingForm } from "@/components/profile-pricing-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProfileCoursesForm } from "@/components/profile-courses-form";
import { auth } from "@/auth";
import {
  getUserPricing,
  getUserData,
  getUserCourses,
  getUserAvailability,
} from "@/actions/user-configuration";
import { ProfileAvailabilityForm } from "@/components/profile-availability-form";

export default async function MyProfile() {
  const session = await auth();
  const pricingConfig = await getUserPricing(session?.user?.id || "");
  const preCoursesConfig = await getUserCourses(session?.user?.id || "");
  const coursesConfig = preCoursesConfig.map((course) => course.courseId);
  const userBasicData = await getUserData(session?.user?.id || "");
  const userAvailability = await getUserAvailability(session?.user?.id || "");

  let initials;
  if (userBasicData && userBasicData.firstname && userBasicData.lastname) {
    initials = `${Array.from(userBasicData.firstname)[0]}${
      Array.from(userBasicData.lastname)[0]
    }`;
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
                <AvatarImage
                  src={`/photos/${userBasicData?.email?.split("@")[0]}.jpg`}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <CardTitle>{`${userBasicData?.firstname} ${userBasicData?.lastname}`}</CardTitle>
              <p>
                <span className="font-bold">Correo: </span>
                <a
                  href={`mailto:${userBasicData?.email}`}
                  className=" hover:border-b border-foreground"
                >
                  {userBasicData?.email}
                </a>
              </p>
            </CardContent>
          </Card>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Precios</CardTitle>
              <CardDescription>
                Selecciona la duración de las tutorías con tus precios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfilePricingForm
                userId={session?.user?.id || ""}
                pricingConfig={JSON.parse(JSON.stringify(pricingConfig))}
              ></ProfilePricingForm>
            </CardContent>
          </Card>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Asignaturas como tutor</CardTitle>
              <CardDescription>
                Selecciona las asignaturas a las que quieres ser solicitado para
                tutorías
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileCoursesForm
                userId={session?.user?.id || ""}
                courses={courses}
                coursesConfig={coursesConfig}
              ></ProfileCoursesForm>
            </CardContent>
          </Card>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Horarios disponibles</CardTitle>
              <CardDescription>
                Selecciona los horarios en los que estás disponible para ofrecer
                tutorías
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileAvailabilityForm
                userId={session?.user?.id || ""}
                availabilityConfig={userAvailability || []}
              ></ProfileAvailabilityForm>
            </CardContent>
          </Card>

          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Tus Logros</CardTitle>
              <CardDescription>
                Estos son los logros que has conseguido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 max-w-screen-2xl mt-6 justify-center">
                <HoverCard>
                  <HoverCardTrigger className="flex justify-center">
                    <Button
                      className="w-20 h-20 p-4 text-center border flex flex-col items-center rounded-full justify-between hover:cursor-help"
                      variant="outline"
                    >
                      <Image
                        src="/achievements/pre-release-access.png"
                        alt="Pre-Release"
                        width={64}
                        height={64}
                        className="dark:invert"
                      />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex justify-start my-2 items-center">
                      <div className="w-14 h-14 flex items-center mr-2 justify-center bg-secondary rounded-full">
                        <Image
                          src="/achievements/pre-release-access.png"
                          alt="Pre-Release"
                          width={40}
                          height={40}
                          className="dark:invert p-1"
                        />
                      </div>
                      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight h-full">
                        Usurio Pre-Registrado
                      </h3>
                    </div>
                    {/*<p className="text-sm text-muted-foreground">
                0 usuarios tienen este logro
  </p>*/}

                    <p className="mt-2">
                      Eres un usuario que ha completado el Pre-Registro de
                      Tuto-U. ¡Gracias!
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
