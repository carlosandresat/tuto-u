import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";

export default function Login() {
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
        className="w-16 mb-12"
      />
      <Card className="max-w-screen-sm w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Ingresa tus credenciales</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="justify-center space-x-2 flex-col md:flex-row">
          <Link href="/auth/register">
            <Button variant="link">¿No tienes cuenta?</Button>
          </Link>
          <Separator orientation="vertical" className="hidden md:block h-8" />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">¿Olvidaste la contraseña?</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Reestablece tu contraseña</DialogTitle>
                <DialogDescription>
                  Aún no terminamos de implementar esta funcionalidad, por favor
                  sigue estos pasos y actualizaremos manualmente tu contraseña
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center">
                <Image
                  src={`/instructions/restart-password.png`}
                  alt="Restart password instructions"
                  width={900}
                  height={900}
                />
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}
