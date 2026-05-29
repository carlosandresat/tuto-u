import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllAchievementsWithProgress } from "@/actions/achievements-data";
import { AchievementsList } from "@/components/achievements-list";
import { PageContainer } from "@/components/page-container";

export default async function AchievementsPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const { achievements, stats } = await getAllAchievementsWithProgress(session.user.id);

  return (
    <PageContainer size="2xl" className="min-h-screen">
      <div className="w-full">
        <div className="flex flex-col gap-2 border-b pb-4 mb-8">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Mis Logros
          </h2>
          <p className="text-muted-foreground text-sm">
            Visualiza los logros que has obtenido en Tuto-U y tu progreso para desbloquear los siguientes.
          </p>
        </div>
        
        <AchievementsList achievements={achievements} stats={stats} />
      </div>
    </PageContainer>
  );
}
