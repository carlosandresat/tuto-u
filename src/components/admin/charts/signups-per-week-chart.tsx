"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import type { SignupsPerWeekRow } from "@/data/admin-stats";
import { chartTooltipContent } from "./chart-tooltip-content";
import { ChartEmptyState } from "./chart-empty-state";

const chartConfig = {
  signups: {
    label: "Registros",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

/** "YYYY-MM-DD" (lunes UTC) -> "DD MMM" en español. `weekStart` ya viene en UTC. */
const formatWeekLabel = (weekStart: string) =>
  new Date(`${weekStart}T00:00:00Z`).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });

export function SignupsPerWeekChart({ data }: { data: SignupsPerWeekRow[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registros por semana</CardTitle>
        <CardDescription>
          Cuántos usuarios nuevos se registraron cada semana (lunes a
          domingo, UTC).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Registros por semana
          </p>
          {data.length === 0 ? (
            <ChartEmptyState message="Aún no hay usuarios registrados." />
          ) : (
            <ChartContainer config={chartConfig}>
              <LineChart accessibilityLayer data={data} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="weekStart"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={formatWeekLabel}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={30}
                  allowDecimals={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={chartTooltipContent({
                    labelFormatter: (value) => formatWeekLabel(String(value)),
                  })}
                />
                <Line
                  dataKey="signups"
                  type="monotone"
                  stroke="var(--color-signups)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
