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
import { cancelSession } from "@/actions/sessions-data";

export function CancelDialog({ sessionId, setState, email, userName }: { sessionId: number, setState:any, email:string, userName:string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto" variant="secondary">
          Cancelar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirma cancelación</DialogTitle>
        </DialogHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          ¿Estás seguro de que deseas cancelar la tutoría?
        </h4>

        <DialogFooter className="sm:justify-end flex flex-col">
        <DialogClose asChild>

          <Button variant="destructive" onClick={async () => {
            setState("canceled")
            await cancelSession(sessionId, email, userName)
            window.location.reload()
          }}>Cancelar</Button>
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
