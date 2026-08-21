import { PageContainer } from "@/components/page-container";
import { AdminNav } from "@/components/admin/admin-nav";
import { StatTile } from "@/components/admin/stat-tile";
import { TutorsPerCourseChart } from "@/components/admin/charts/tutors-per-course-chart";
import { AveragePricePerCourseChart } from "@/components/admin/charts/average-price-per-course-chart";
import { AveragePricePerDurationChart } from "@/components/admin/charts/average-price-per-duration-chart";
import { SessionsByStatusChart } from "@/components/admin/charts/sessions-by-status-chart";
import { SignupsPerWeekChart } from "@/components/admin/charts/signups-per-week-chart";
import {
  getAveragePricePerCourse,
  getAveragePricePerDuration,
  getSessionsByStatus,
  getSignupsPerWeek,
  getTutorSupply,
  getTutorsPerCourse,
} from "@/data/admin-stats";

export default async function AdminStatsPage() {
  const [
    tutorsPerCourse,
    averagePricePerCourse,
    averagePricePerDuration,
    sessionsByStatus,
    signupsPerWeek,
    tutorSupply,
  ] = await Promise.all([
    getTutorsPerCourse(),
    getAveragePricePerCourse(),
    getAveragePricePerDuration(),
    getSessionsByStatus(),
    getSignupsPerWeek(),
    getTutorSupply(),
  ]);

  const completedSessions =
    sessionsByStatus.find((row) => row.status === "completed")?.sessions ?? 0;

  return (
    <PageContainer size="2xl">
      <AdminNav />
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight w-full mb-6">
        Estadísticas
      </h1>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <StatTile label="Usuarios registrados" value={tutorSupply.totalUsers} />
        <StatTile
          label="Tutores activos"
          value={tutorSupply.activeTutors}
          description={`${tutorSupply.activeTutorsShare}% del total de usuarios`}
        />
        <StatTile label="Sesiones completadas" value={completedSessions} />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <TutorsPerCourseChart data={tutorsPerCourse} />
        <SessionsByStatusChart data={sessionsByStatus} />
        <AveragePricePerCourseChart data={averagePricePerCourse} />
        <AveragePricePerDurationChart data={averagePricePerDuration} />
        <div className="lg:col-span-2">
          <SignupsPerWeekChart data={signupsPerWeek} />
        </div>
      </div>
    </PageContainer>
  );
}
