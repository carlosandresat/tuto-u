import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { acceptSession } from "@/actions/sessions-data";

export function AcceptDialog({
  sessionId,
  setState,
  studentEmail,
  studentName,
}: {
  sessionId: number;
  setState: any;
  studentEmail: string;
  studentName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Aceptar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirma aceptación</DialogTitle>
        </DialogHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          ¿Estás seguro de que deseas aceptar la tutoría?
        </h4>

        <DialogFooter className="sm:justify-end flex flex-col">
          <DialogClose asChild>
            <Button
              onClick={async () => {
                setState("accepted");
                await acceptSession(sessionId, studentEmail, studentName);
                window.location.reload();
              }}
            >
              Aceptar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
