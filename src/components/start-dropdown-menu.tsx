import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/login-dialog";
import { RegisterDialog } from "@/components/register-dialog";
import Link from "next/link";

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
          <Link href="/auth/register"><Button variant="outline" className="w-full">Registro</Button></Link>
          <Link href="/auth/login" ><Button className="w-full">Entrar</Button></Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
