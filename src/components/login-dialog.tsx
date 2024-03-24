import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"

  
  export function LoginDialog() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto">
            Entrar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ingresa tu correo y contraseña</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Correo
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña
            </Label>
            <Input id="password" className="col-span-3" type="password"/>
          </div>
        </div>
  
          <DialogFooter>
              <Button type="button">
                Entrar
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  