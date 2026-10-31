import Link from "next/link";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PeriodForm } from "@/components/mentors/period-form";
import { MentorListEditor } from "@/components/mentors/mentor-list-editor";
import { getAcademicPeriods, getMentorAssignments } from "@/data/mentors";
import type { PeriodStatus } from "@/lib/academic-period";
import { cn } from "@/lib/utils";

const statusLabel: Record<PeriodStatus, string> = {
  past: "Finalizado",
  current: "Vigente",
  future: "Próximo",
};

type Props = {
  searchParams: Promise<{ period?: string }>;
};

export default async function MentorsPage({ searchParams }: Props) {
  const { period: periodParam } = await searchParams;
  const periods = await getAcademicPeriods();

  // Sin selección explícita: el vigente, si no el próximo más cercano, si no el más reciente.
  const selected =
    periods.find((p) => p.id === Number(periodParam)) ??
    periods.find((p) => p.status === "current") ??
    periods.filter((p) => p.status === "future").at(-1) ??
    periods[0];
  const mentors = selected ? await getMentorAssignments(selected.id) : [];

  return (
    <PageContainer size="xl" className="space-y-6">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight w-full text-left">
        Mentores
      </h1>
      <p className="text-muted-foreground w-full text-left">
        Los mentores del periodo vigente aparecen con la etiqueta &quot;Mentor&quot; y
        dictan los cursos de nivelación sin costo.
      </p>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Periodos</CardTitle>
            <CardDescription>Dos por año. Escoge uno para ver sus mentores.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {periods.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aún no hay periodos.</p>
            ) : (
              <ul className="space-y-2">
                {periods.map((period) => (
                  <li key={period.id}>
                    <Link
                      href={`/mentors?period=${period.id}`}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-md border p-3 transition-colors hover:bg-secondary",
                        selected?.id === period.id && "border-primary"
                      )}
                    >
                      <div>
                        <p className="font-medium">{period.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {period.startsOn} → {period.endsOn} · {period.mentorCount} mentor(es)
                        </p>
                      </div>
                      <Badge variant={period.status === "current" ? "default" : "outline"}>
                        {statusLabel[period.status]}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t pt-6">
              <h3 className="mb-4 font-semibold">Nuevo periodo</h3>
              <PeriodForm />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>
              {selected ? `Mentores ${selected.label}` : "Mentores del periodo"}
            </CardTitle>
            <CardDescription>
              {selected
                ? `${selected.startsOn} → ${selected.endsOn} (hora de Ecuador)`
                : "Crea un periodo para empezar a agregar mentores."}
            </CardDescription>
          </CardHeader>
          {selected && (
            <CardContent>
              <MentorListEditor key={selected.id} period={selected} mentors={mentors} />
            </CardContent>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
