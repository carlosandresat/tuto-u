import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/login-dialog";
import { RegisterDialog } from "@/components/register-dialog";

export function StartDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <LogIn />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col">
          <RegisterDialog buttonText={<>Registro</>}></RegisterDialog>
          <LoginDialog buttonText="Entrar"></LoginDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
