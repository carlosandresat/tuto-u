import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReportSessionForm } from "@/components/report-session-form";

export function ReportSessionDialog({
  buttonText,
  sessionId,
}: {
  buttonText: string;
  sessionId: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reportar tutoría</DialogTitle>
        </DialogHeader>
        <ReportSessionForm sessionId={sessionId} />
      </DialogContent>
    </Dialog>
  );
}
