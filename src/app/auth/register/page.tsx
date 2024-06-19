import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { RegisterForm } from "@/components/register-form";
export default function Register() {
  return (
    <section className="flex min-h-screen flex-col items-center  p-8 justify-center">
        <Link href="/" className="absolute top-0 left-0 p-6">
          <Button variant="link">
            <ArrowLeft className="mr-2" /> Regresar
          </Button>
        </Link>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={60}
        height={60}
        className="w-16 my-12"
      />
      <Card className="max-w-screen-sm w-full">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>Crea una cuenta en Tuto-U</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/auth/login">
            <Button variant="link">¿Ya tienes una cuenta?</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
