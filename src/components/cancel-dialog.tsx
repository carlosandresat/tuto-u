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

export function CancelDialog() {
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
          <Button variant="destructive">Cancelar</Button>
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
