import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { LoginForm } from "@/components/login-form";
  import Link from "next/link";
  import Image from "next/image";

  
  export function LoginDialog({buttonText}:{buttonText:string}) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto">
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ingresa tus credenciales</DialogTitle>
          </DialogHeader>
          <LoginForm></LoginForm>
          <Dialog>
          <div className="flex justify-center">
            <DialogTrigger asChild>
              <Button variant="link">¿Olvidaste la contraseña?</Button>
            </DialogTrigger>
          </div>

          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reestablece tu contraseña</DialogTitle>
              <DialogDescription>Aún no terminamos de implementar esta funcionalidad, por favor sigue estos pasos y actualizaremos manualmente tu contraseña</DialogDescription>
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
        </DialogContent>
      </Dialog>
    );
  }
  