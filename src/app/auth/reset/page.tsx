import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ResetForm } from "@/components/reset-form";

export default function ResetPage() {
  return (
    <section className="flex min-h-screen flex-col items-center p-8 justify-center">
      <Link href="/auth/login" className="absolute top-0 left-0 p-6">
        <Button variant="link">
          <ArrowLeft className="mr-2" /> Regresar al Login
        </Button>
      </Link>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={60}
        height={60}
        className="w-16 mb-12"
      />
      <Card className="max-w-screen-sm w-full">
        <CardHeader>
          <CardTitle>Restablece tu contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para recibir un enlace de recuperación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetForm />
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/auth/login">
            <Button variant="link">Volver al inicio de sesión</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
