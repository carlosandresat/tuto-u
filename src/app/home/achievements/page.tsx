import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllAchievementsWithProgress } from "@/actions/achievements-data";
import { AchievementsList } from "@/components/achievements-list";

export default async function AchievementsPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const { achievements, stats } = await getAllAchievementsWithProgress(session.user.id);

  return (
    <section className="min-h-screen w-full py-12 px-6 md:px-12 flex items-center justify-start flex-col">
      <div className="max-w-screen-2xl w-full mt-24">
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
    </section>
  );
}
