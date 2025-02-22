"use client";

import { Badge } from "@/components/ui/badge";

export function ClientTimeBadges({ hours }: { hours: number[] }) {
  const localHours = hours.map((hour) => {
    const serverTime = new Date();
    serverTime.setUTCHours(hour);
    return serverTime.getHours();
  });
  const sortedLocalHours = localHours.sort((a, b) => a - b);

  return (
    <div className="flex flex-wrap gap-4">
      {sortedLocalHours.map((hour, index) => (
        <Badge key={index}>
          {hour <= 12 ? hour : hour % 12} {hour < 12 ? "AM" : "PM"}
        </Badge>
      ))}
    </div>
  );
}
