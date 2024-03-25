import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { PreregisterForm } from "@/components/preregister-form";

export default function Preregister() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-8">
      <Link href="/" className=" self-start mb-2">
        <Button variant="link">
          <ArrowLeft className="mr-2"/> Regresar
        </Button>
      </Link>

      <Card className="max-w-screen-lg w-full">
        <CardHeader>
          <CardTitle>Pre-Registro</CardTitle>
          <CardDescription>
            Completa el siguiente formulario para pre-registrar tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PreregisterForm></PreregisterForm>
        </CardContent>
      </Card>
    </section>
  );
}
