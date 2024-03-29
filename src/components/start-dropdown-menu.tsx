import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/login-dialog";
import { RegisterDialog } from "@/components/register-dialog";

export function StartDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <LogIn />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col">
          <RegisterDialog></RegisterDialog>
          <LoginDialog></LoginDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
