import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { RateForm } from "@/components/rate-form";

  
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
            <DialogTitle>Califica la tutoría</DialogTitle>
          </DialogHeader>
          <RateForm />  
        </DialogContent>
      </Dialog>
    );
  }
  