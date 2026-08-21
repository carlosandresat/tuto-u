"use client";

import * as React from "react";
import { Cell, Pie, PieChart } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import type { SessionsByStatusRow } from "@/data/admin-stats";
import { chartTooltipContent } from "./chart-tooltip-content";
import { ChartEmptyState } from "./chart-empty-state";
import { ChartExportButton } from "@/components/admin/chart-export-button";

const STATUS_COLORS: Record<string, string> = {
  requested: "hsl(var(--chart-1))",
  accepted: "hsl(var(--chart-2))",
  completed: "hsl(var(--chart-3))",
  rejected: "hsl(var(--chart-4))",
  canceled: "hsl(var(--chart-5))",
  other: "hsl(var(--muted-foreground))",
};

export function SessionsByStatusChart({ data }: { data: SessionsByStatusRow[] }) {
  const total = React.useMemo(
    () => data.reduce((acc, row) => acc + row.sessions, 0),
    [data]
  );

  const chartConfig = React.useMemo(
    () =>
      data.reduce<ChartConfig>((config, row) => {
        config[row.status] = {
          label: row.label,
          color: STATUS_COLORS[row.status] ?? "hsl(var(--chart-1))",
        };
        return config;
      }, {}),
    [data]
  );

  const exportRef = React.useRef<HTMLDivElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sesiones por estado</CardTitle>
        <CardDescription>
          Distribución de todas las sesiones solicitadas según su estado
          actual.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={exportRef}>
          <p className="mb-3 text-sm font-medium text-foreground">
            Sesiones por estado
          </p>
          {total === 0 ? (
            <ChartEmptyState message="Aún no se ha solicitado ninguna sesión." />
          ) : (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  content={chartTooltipContent({ hideLabel: true, nameKey: "status" })}
                />
                <Pie
                  data={data}
                  dataKey="sessions"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={4}
                  isAnimationActive={false}
                >
                  {data.map((row) => (
                    <Cell key={row.status} fill={`var(--color-${row.status})`} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="status" />} />
              </PieChart>
            </ChartContainer>
          )}
        </div>
        <ChartExportButton targetRef={exportRef} filename="sesiones-por-estado" />
      </CardContent>
    </Card>
  );
}
