import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserNameByEmail, getUserProfile } from "@/actions/profile";
import { ClientTimeBadges } from "@/components/client-time-badges";

type Props = {
  params: { user: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const email = params.user.replace("-", ".").concat("@yachaytech.edu.ec");
  const user = await getUserNameByEmail(email);
  const title = `${user} | Tuto-U`;
  const description = `Visita el perfil de ${user}. Conoce su progreso en Tuto-U.`;
  // fetch data

  return {
    title: title,
    description: description,
  };
}

export default async function Page({ params }: Props) {
  const session = await auth();
  const email = params.user.replace("-", ".").concat("@yachaytech.edu.ec");
  const tutorData = await getUserProfile(email);
  if (tutorData.error !== undefined) {
    return (
      <section className="w-full p-8 flex items-center justify-center flex-col space-y-6 min-h-screen">
        <Button variant="link" asChild>
          <Link
            href={session?.user ? "/home" : "/"}
            className="absolute top-0 left-0 mt-6"
          >
            <ArrowLeft className="mr-2" /> Regresar
          </Link>
        </Button>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-16">
          User Not Found
        </h1>
      </section>
    );
  }

  return (
    <section className="w-full p-8 flex items-center justify-center flex-col space-y-6">
      <Button variant="link" className="self-start px-0" asChild>
        <Link href={session?.user ? "/home" : "/"}>
          <ArrowLeft className="mr-2" /> Regresar
        </Link>
      </Button>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Perfil de Usuario
      </h1>

      <Card className="w-full max-w-screen-xl">
        <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/profile-pictures/${tutorData.profilePic}`}
              alt={tutorData.name}
            />
            <AvatarFallback>
              {tutorData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold">
              {tutorData.name}
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 shrink-0" />
                <a href={`mailto:${tutorData.email}`} className="break-all">
                  {tutorData.email}
                </a>
              </div>
              {tutorData.whatsapp && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`https://wa.me/${tutorData.whatsapp.substring(1)}`}>
                    {tutorData.whatsapp}
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">{tutorData.description}</p>
        </CardContent>
      </Card>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Resumen de Tutor
      </h2>
      {tutorData.courses.length === 0 &&
      tutorData.pricing.length === 0 &&
      tutorData.availability.length === 0 ? (
        <p className="text-center">
          Este usuario no posee información como tutor
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-screen-xl">
            <Card>
              <CardHeader>
                <CardTitle>Asignaturas</CardTitle>
              </CardHeader>
              <CardContent>
                {tutorData.courses.length === 0 && (
                  <p className="text-center">No hay asignaturas disponibles</p>
                )}
                <ul className="ml-6 list-disc [&>li]:mt-2">
                  {tutorData.courses.map((course, index) => (
                    <li key={index}>{course.name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Precios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutorData.pricing.length === 0 && (
                    <p className="text-center">No hay precios disponibles</p>
                  )}
                  {tutorData.pricing.map((slot, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{slot.duration}</span>
                      <Badge variant="outline">${slot.price.toFixed(2)}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="w-full max-w-screen-xl">
            <CardHeader>
              <CardTitle>Horario</CardTitle>
            </CardHeader>
            {tutorData.availability.length === 0 && (
              <p className="text-center">No hay horario disponible</p>
            )}
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tutorData.availability.map((data, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    {data.day}
                  </h4>

                  <ClientTimeBadges hours={data.hours} />
                </div>
              ))}
            </CardContent>
          </Card>
          {tutorData.courses.length !== 0 &&
            tutorData.pricing.length !== 0 &&
            tutorData.availability.length !== 0 && (
              <Button size="lg" asChild>
                <Link href={`/${params.user}/request`}>
                  <Calendar className="mr-2 h-4 w-4" /> ¡Solicita una tutoría!
                </Link>
              </Button>
            )}
        </>
      )}
    </section>
  );
}
