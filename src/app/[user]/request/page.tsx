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

export default function Page() {
  return (
    <section className="md:min-h-screen w-full p-6 items-center flex flex-col space-y-6">
      <Button variant="link" asChild>
        <Link href="#" className="self-start">
          <ArrowLeft className="mr-2" /> Regresar
        </Link>
      </Button>
      <Card className="w-full max-w-screen-lg">
        <CardHeader>
          <CardTitle>Solicita una tutoría con Nombre Tutor</CardTitle>
          <CardDescription>
            Llena el formulario para realizar una solicitud de tutoría
          </CardDescription>
        </CardHeader>
        <CardContent>Aquí irá el formulario</CardContent>
      </Card>
    </section>
  );
}
