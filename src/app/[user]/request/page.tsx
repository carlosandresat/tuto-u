import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ProfileRequestForm } from "@/components/profile-request-form";

export default function Page({ params }: { params: { user: string } }) {
  const formData = {
    name: "Nombre Tutor",
    courses: [
      { id: 17, course: "Nivelación: Fundamentos de Matemáticas" },
      { id: 18, course: "Nivelación: Física" },
      { id: 19, course: "Nivelación: Química" },
      { id: 20, course: "Nivelación: Redacción" },
      { id: 1, course: "Cálculo 1" },
    ],
    availability: [
      { day: 0, hours: [10, 11, 18, 19, 20, 21, 22, 23] },
      { day: 1, hours: [20, 21, 22, 23] },
      { day: 2, hours: [18, 19, 20, 21, 22, 23] },
      { day: 4, hours: [10, 11, 18, 19, 20, 21] },
      { day: 5, hours: [18, 19, 20, 21] },
      { day: 6, hours: [10, 11, 18, 19, 20, 21, 22, 23] },
    ],
    durations: [60, 90, 120, 150],
  };

  return (
    <section className="md:min-h-screen w-full p-6 items-center flex flex-col space-y-6">
      <Button variant="link" className="px-0 self-start" asChild>
        <Link href={`/${params.user}/profile`}>
          <ArrowLeft className="mr-2" /> Regresar
        </Link>
      </Button>
      <Card className="w-full max-w-screen-lg">
        <CardHeader>
          <CardTitle>Solicita una tutoría con {formData.name}</CardTitle>
          <CardDescription>
            Llena el formulario para realizar una solicitud de tutoría
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileRequestForm {...formData} />
        </CardContent>
      </Card>
    </section>
  );
}
