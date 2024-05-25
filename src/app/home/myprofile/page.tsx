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
import Link from "next/link";
import { AchievementCard } from "@/components/achievement-card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfilePricingForm } from "@/components/profile-pricing-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProfileCoursesForm } from "@/components/profile-courses-form";
import { auth } from "@/auth";
import { ArrowLeft } from "lucide-react";
import {
  getUserPricing,
  getUserData,
  getUserCourses,
  getUserAvailability,
} from "@/actions/user-configuration";
import { ProfileAvailabilityForm } from "@/components/profile-availability-form";
import { getUserAchievements } from "@/actions/achievements-data";

export default async function MyProfile() {
  const session = await auth();
  const pricingConfig = await getUserPricing(session?.user?.id || "");
  const preCoursesConfig = await getUserCourses(session?.user?.id || "");
  const coursesConfig = preCoursesConfig.map((course) => course.courseId);
  const userBasicData = await getUserData(session?.user?.id || "");
  const userAvailability = await getUserAvailability(session?.user?.id || "");

  const mondayAvailability = userAvailability
    .filter(
      (row: { dayOfWeek: number; timeSlot: number }) => row.dayOfWeek == 1
    )
    .map((row: { dayOfWeek: number; timeSlot: number }) => row.timeSlot);
  const tuesdayAvailability = userAvailability
    .filter(
      (row: { dayOfWeek: number; timeSlot: number }) => row.dayOfWeek == 2
    )
    .map((row: { dayOfWeek: number; timeSlot: number }) => row.timeSlot);
  const wednesdayAvailability = userAvailability
    .filter(
      (row: { dayOfWeek: number; timeSlot: number }) => row.dayOfWeek == 3
    )
    .map((row: { dayOfWeek: number; timeSlot: number }) => row.timeSlot);
  const thursdayAvailability = userAvailability
    .filter(
      (row: { dayOfWeek: number; timeSlot: number }) => row.dayOfWeek == 4
    )
    .map((row: { dayOfWeek: number; timeSlot: number }) => row.timeSlot);
  const fridayAvailability = userAvailability
    .filter(
      (row: { dayOfWeek: number; timeSlot: number }) => row.dayOfWeek == 5
    )
    .map((row: { dayOfWeek: number; timeSlot: number }) => row.timeSlot);
  const saturdayAvailability = userAvailability
    .filter(
      (row: { dayOfWeek: number; timeSlot: number }) => row.dayOfWeek == 6
    )
    .map((row: { dayOfWeek: number; timeSlot: number }) => row.timeSlot);
  const sundayAvailability = userAvailability
    .filter(
      (row: { dayOfWeek: number; timeSlot: number }) => row.dayOfWeek == 0
    )
    .map((row: { dayOfWeek: number; timeSlot: number }) => row.timeSlot);

  let initials;
  if (userBasicData && userBasicData.firstname && userBasicData.lastname) {
    initials = `${Array.from(userBasicData.firstname)[0]}${
      Array.from(userBasicData.lastname)[0]
    }`;
  }

  const achievements = await getUserAchievements(session?.user?.id || "")

  const timeOptions = ["8", "10", "12", "14", "16", "18", "20", "22"]

  const courses = [
    { id: 17, course: "Nivelación: Fundamentos de Matemáticas"},
    { id: 18, course: "Nivelación: Física"},
    { id: 19, course: "Nivelación: Química"},
    { id: 20, course: "Nivelación: Redacción"},
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
      <Link href="/home" className="mt-20 md:mt-28 p-6 self-start">
      <Button variant="link">
            <ArrowLeft className="mr-2" /> Regresar
          </Button>
        </Link>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-4 xl:mt-0">
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
                Selecciona la duración de las tutorías con tus precios. Si seleccionas una duración y el precio queda vacío significa que tus tutorías son gratuitas
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
                timeOptions={timeOptions}
                mondayAvailability={mondayAvailability}
                tuesdayAvailability={tuesdayAvailability}
                wednesdayAvailability={wednesdayAvailability}
                thursdayAvailability={thursdayAvailability}
                fridayAvailability={fridayAvailability}
                saturdayAvailability={saturdayAvailability}
                sundayAvailability={sundayAvailability}
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
              <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-screen-2xl mt-6 justify-center">
              {achievements.map((row, index)=>
          <AchievementCard {...row} key={index} pathname="/home/myprofile"></AchievementCard>
          )}

              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
