"use client";

import * as React from "react";
import { ChartTooltipContent } from "@/components/ui/chart";

type ExtraProps = Omit<
  React.ComponentProps<typeof ChartTooltipContent>,
  "active" | "payload" | "coordinate" | "accessibilityLayer" | "activeIndex" | "label"
>;

/**
 * recharts@3's `TooltipContentProps` marks `payload`/`coordinate`/`accessibilityLayer`/
 * `activeIndex` as required, which the shadcn `chart.tsx` primitive (generated against
 * recharts@2 typings) doesn't declare as optional. Passing `<ChartTooltipContent />`
 * directly as `Tooltip`'s `content` element therefore fails to type-check even though
 * it works at runtime — recharts clones the element and injects those props itself.
 * This forwards them through the render-function form of `content` instead, so each
 * chart doesn't need its own cast.
 */
export function chartTooltipContent(extraProps: ExtraProps) {
  return function renderTooltipContent(props: any) {
    return <ChartTooltipContent {...props} {...extraProps} />;
  };
}
