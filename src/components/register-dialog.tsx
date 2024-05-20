import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegisterForm } from "@/components/register-form";

export function RegisterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Registro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registro</DialogTitle>
          <DialogDescription>Completa el siguiente formulario para registrar tu cuenta</DialogDescription>
        </DialogHeader>
        <RegisterForm/>
      </DialogContent>
    </Dialog>
  );
}
