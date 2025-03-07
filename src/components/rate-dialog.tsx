import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RateForm } from "@/components/rate-form";

export function RateDialog({
  buttonText,
  role,
  sessionId,
}: {
  buttonText: string;
  role: string;
  sessionId: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Califica la tutoría</DialogTitle>
        </DialogHeader>
        <RateForm role={role} sessionId={sessionId} />
      </DialogContent>
    </Dialog>
  );
}
