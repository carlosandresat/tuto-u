"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import type { AveragePricePerDurationRow } from "@/data/admin-stats";
import { chartTooltipContent } from "./chart-tooltip-content";
import { ChartEmptyState } from "./chart-empty-state";
import { ChartExportButton } from "@/components/admin/chart-export-button";

const chartConfig = {
  averagePrice: {
    label: "Precio promedio",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export function AveragePricePerDurationChart({
  data,
}: {
  data: AveragePricePerDurationRow[];
}) {
  const exportRef = React.useRef<HTMLDivElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Precio promedio por duración</CardTitle>
        <CardDescription>
          Tarifa configurada promedio por duración de sesión, contando cada
          tutor una sola vez.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={exportRef}>
          <p className="mb-3 text-sm font-medium text-foreground">
            Precio promedio por duración
          </p>
          {data.length === 0 ? (
            <ChartEmptyState message="Aún no hay tarifas configuradas." />
          ) : (
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={data} margin={{ top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="durationLabel"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  tickFormatter={(value) => `$${value}`}
                />
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
        <ChartExportButton targetRef={exportRef} filename="precio-promedio-por-duracion" />
      </CardContent>
    </Card>
  );
}
