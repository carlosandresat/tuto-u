import { PageContainer } from "@/components/page-container";
import { AdminNav } from "@/components/admin/admin-nav";
import { ReportCard } from "@/components/admin/report-card";
import { getReports } from "@/data/admin-reports";

export default async function AdminReportsPage() {
  const reports = await getReports();

  return (
    <PageContainer size="2xl">
      <AdminNav />
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight w-full mb-6">
        Reportes de sesiones
      </h1>

      {reports.length === 0 ? (
        <p className="text-muted-foreground text-center w-full py-12">
          No hay reportes registrados por el momento.
        </p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {reports.map((report) => (
            <ReportCard key={report.reportId} report={report} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
