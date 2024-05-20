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
import Image from "next/image";

import { PreregisterForm } from "@/components/preregister-form";

export default function Preregister() {
  return (
    <section className="flex min-h-screen flex-col items-center  p-8 justify-center">
      <Link href="/" className=" self-start fixed top-6 left-0 p-6">
        <Button variant="link">
          <ArrowLeft className="mr-2" /> Regresar
        </Button>
      </Link>

      <Card className="max-w-screen-lg w-full">
        <CardContent>
          <div className="flex items-center flex-col justify-between h-full">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="w-16 mt-12"
            />
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-12">
              El Pre-Registro ha terminado
            </h2>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-12 text-center">
              ¡Gracias por seguir explorando esta página! Ahora puedes
              registrarte en Inicio
            </h4>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
