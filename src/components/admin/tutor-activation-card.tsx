import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TutorSupply } from "@/data/admin-stats";

type ActivationSupply = Pick<
  TutorSupply,
  "activeTutors" | "tutorsWithCourses" | "tutorsWithAvailability" | "tutorsWithPricing"
>;

type ActivationRow = {
  key: string;
  label: string;
  count: number;
};

/**
 * Cada porcentaje es `activeTutors / count`, NUNCA al revés.
 *
 * `tutorsWithCourses` / `tutorsWithAvailability` / `tutorsWithPricing` son cada uno
 * un SUPERCONJUNTO de `activeTutors` (que es la intersección de los tres, ver
 * `ACTIVE_TUTOR_WHERE` en `src/data/admin-stats.ts`). Si el porcentaje fuera
 * `count / activeTutors` podría superar el 100% — un número sin sentido aquí.
 * Con este orden, cada fila responde "de los N que cumplen este requisito,
 * cuántos son tutores activos" y nunca pasa de 100%.
 */
function toActivationRows(supply: ActivationSupply): ActivationRow[] {
  return [
    { key: "courses", label: "Con al menos un curso", count: supply.tutorsWithCourses },
    {
      key: "availability",
      label: "Con disponibilidad declarada",
      count: supply.tutorsWithAvailability,
    },
    { key: "pricing", label: "Con tarifas configuradas", count: supply.tutorsWithPricing },
  ];
}

function percentageOf(activeTutors: number, count: number): number {
  // Sin usuarios en ese grupo no hay porcentaje que calcular: 0, nunca NaN.
  return count === 0 ? 0 : Math.round((activeTutors / count) * 100);
}

export function TutorActivationCard({ supply }: { supply: ActivationSupply }) {
  const rows = toActivationRows(supply);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activación de tutores</CardTitle>
        <CardDescription>
          Cada requisito por separado frente a los tutores activos, que cumplen
          los tres a la vez. Son poblaciones que se solapan, no partes de un
          total: un mismo tutor puede aparecer en las tres filas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.map((row) => {
          const percentage = percentageOf(supply.activeTutors, row.count);
          return (
            <div key={row.key} className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium text-foreground">
                  {supply.activeTutors.toLocaleString("es-EC")} de{" "}
                  {row.count.toLocaleString("es-EC")}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({percentage}%)
                  </span>
                </span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-muted"
                aria-hidden
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        <p className="border-t pt-4 text-xs text-muted-foreground">
          La diferencia son tutores que cumplen ese requisito pero no los otros
          dos: no aparecen en los listados, no se pueden reservar, o no tienen
          qué ofrecer en el formulario.
        </p>
      </CardContent>
    </Card>
  );
}
