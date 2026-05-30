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
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Mis Logros
        </h1>
        <p className="text-muted-foreground text-sm mt-2 mb-8">
          Visualiza los logros que has obtenido en Tuto-U y tu progreso para desbloquear los siguientes.
        </p>
        
        <AchievementsList achievements={achievements} stats={stats} />
      </div>
    </PageContainer>
  );
}
