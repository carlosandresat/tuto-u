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

export function RegisterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto" variant="outline">Registro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registro</DialogTitle>
          <DialogDescription>Completa el siguiente formulario para registrar tu cuenta</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombres completos
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mail" className="text-right">
              Correo institucional
            </Label>
            <Input id="mail" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña
            </Label>
            <Input id="password" className="col-span-3" type="password" />
          </div>
        </div>

        <DialogFooter>
          <Button type="button">Registrarse</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
