import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { LoginForm } from "@/components/login-form";

  
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
            <DialogTitle>Ingresa tus credenciales</DialogTitle>
          </DialogHeader>
          <LoginForm></LoginForm>  
        </DialogContent>
      </Dialog>
    );
  }
  