import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { getReports } from "@/data/admin-reports";

type Report = Awaited<ReturnType<typeof getReports>>[number];

const STATUS_LABELS: Record<string, string> = {
  requested: "Solicitada",
  accepted: "Aceptada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
  canceled: "Cancelada",
  completed: "Completada",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ReportCard({ report }: { report: Report }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-lg">
            Reporte de {report.reporterFullname}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {formatDate(report.createdAt)}
          </span>
        </div>
        <CardDescription>
          Sesión de {report.sessionCourse} — {report.sessionTopic}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="whitespace-pre-wrap">{report.description}</p>

        <div className="grid gap-4 sm:grid-cols-2 text-sm border-t pt-4">
          <div>
            <p className="font-semibold">Reportado por</p>
            <p>{report.reporterFullname}</p>
            <p className="text-muted-foreground">{report.reporterEmail}</p>
            {report.reporterWhatsapp && (
              <p className="text-muted-foreground">
                WhatsApp: {report.reporterWhatsapp}
              </p>
            )}
          </div>
          <div>
            <p className="font-semibold">Contraparte</p>
            <p>{report.counterpartFullname}</p>
            <p className="text-muted-foreground">{report.counterpartEmail}</p>
            {report.counterpartWhatsapp && (
              <p className="text-muted-foreground">
                WhatsApp: {report.counterpartWhatsapp}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t pt-4 text-sm text-muted-foreground">
          <Badge variant="outline">
            {STATUS_LABELS[report.sessionStatus] ?? report.sessionStatus}
          </Badge>
          <span>Sesión programada: {formatDate(report.sessionDateTime)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
