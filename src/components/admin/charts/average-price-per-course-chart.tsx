"use client";

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
import type { AveragePricePerCourseRow } from "@/data/admin-stats";
import { chartTooltipContent } from "./chart-tooltip-content";
import { ChartEmptyState } from "./chart-empty-state";

const chartConfig = {
  averagePrice: {
    label: "Precio promedio",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export function AveragePricePerCourseChart({
  data,
}: {
  data: AveragePricePerCourseRow[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Precio promedio por curso</CardTitle>
        <CardDescription>
          Tarifa configurada promedio de los tutores activos de cada curso,
          mezclando duraciones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Precio promedio por curso
          </p>
          {data.length === 0 ? (
            <ChartEmptyState message="Aún no hay tarifas configuradas." />
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
                <XAxis dataKey="averagePrice" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={chartTooltipContent({
                    hideLabel: true,
                    formatter: (value) => (
                      <div className="flex w-full items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                          Precio promedio
                        </span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {formatPrice(Number(value))}
                        </span>
                      </div>
                    ),
                  })}
                />
                <Bar
                  dataKey="averagePrice"
                  fill="var(--color-averagePrice)"
                  radius={4}
                  isAnimationActive={false}
                />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
