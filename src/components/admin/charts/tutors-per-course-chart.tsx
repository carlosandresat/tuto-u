"use client";

import * as React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
import type { TutorsPerCourseRow } from "@/data/admin-stats";
import { chartTooltipContent } from "./chart-tooltip-content";
import { ChartEmptyState } from "./chart-empty-state";
import { ChartExportButton } from "@/components/admin/chart-export-button";

const chartConfig = {
  tutors: {
    label: "Tutores activos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TutorsPerCourseChart({ data }: { data: TutorsPerCourseRow[] }) {
  const exportRef = React.useRef<HTMLDivElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutores por curso</CardTitle>
        <CardDescription>
          Cuántos tutores activos dictan cada curso — revela qué cursos aún no
          tienen cobertura.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={exportRef}>
          <p className="mb-3 text-sm font-medium text-foreground">
            Tutores por curso
          </p>
          {data.length === 0 ? (
            <ChartEmptyState message="Aún no hay tutores activos registrados." />
          ) : (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto"
              style={{ height: Math.max(256, data.length * 40) }}
            >
              <BarChart
                accessibilityLayer
                data={data}
                layout="vertical"
                margin={{ left: 0, right: 12 }}
              >
                <YAxis
                  dataKey="course"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={140}
                />
                <XAxis dataKey="tutors" type="number" hide allowDecimals={false} />
                <ChartTooltip
                  cursor={false}
                  content={chartTooltipContent({ hideLabel: true })}
                />
                <Bar
                  dataKey="tutors"
                  fill="var(--color-tutors)"
                  radius={4}
                  isAnimationActive={false}
                />
              </BarChart>
            </ChartContainer>
          )}
        </div>
        <ChartExportButton targetRef={exportRef} filename="tutores-por-curso" />
      </CardContent>
    </Card>
  );
}
