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
import { rejectSession } from "@/actions/sessions-data";

export function RejectDialog({
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
        <Button variant="secondary">Rechazar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar rechazo</DialogTitle>
        </DialogHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          ¿Estás seguro de que deseas rechazar la tutoría?
        </h4>

        <DialogFooter className="sm:justify-end flex flex-col">
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={async () => {
                setState("rejected");
                await rejectSession(sessionId, studentEmail, studentName);
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
