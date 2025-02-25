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

export default function Page() {
  return (
    <section className="md:min-h-screen w-full p-6 items-center flex flex-col space-y-6">
      <Button variant="link" className="px-0 self-start" asChild>
        <Link href="#">
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
        <CardContent>
          <ProfileRequestForm />
        </CardContent>
      </Card>
    </section>
  );
}
