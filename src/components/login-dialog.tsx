import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export function LoginDialog({ buttonText }: { buttonText: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ingresa tus credenciales</DialogTitle>
        </DialogHeader>
        <LoginForm></LoginForm>
        <div className="flex justify-center">
          <Link href="/auth/reset" className="w-full text-center">
            <Button variant="link">¿Olvidaste la contraseña?</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
