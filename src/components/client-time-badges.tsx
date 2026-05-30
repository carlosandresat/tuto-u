"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Slot {
  dayOfWeek: number;
  timeSlot: number;
}

export function ClientAvailabilitySchedule({ availability }: { availability: Slot[] }) {
  const [localSchedule, setLocalSchedule] = useState<{ day: string; hours: number[] }[]>([]);

  useEffect(() => {
    const dayIndexToName = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const grouped: Record<number, number[]> = {};

    availability.forEach((slot) => {
      const base = new Date(Date.UTC(2026, 4, 31, 0, 0, 0)); // baseline Sunday (May 31, 2026)
      base.setUTCDate(base.getUTCDate() + slot.dayOfWeek);
      base.setUTCHours(slot.timeSlot, 0, 0, 0);

      const localDayOfWeek = base.getDay();
      const localHour = base.getHours();

      if (!grouped[localDayOfWeek]) {
        grouped[localDayOfWeek] = [];
      }
      if (!grouped[localDayOfWeek].includes(localHour)) {
        grouped[localDayOfWeek].push(localHour);
      }
    });

    const schedule = Object.entries(grouped)
      .map(([dayOfWeekStr, hours]) => ({
        dayOfWeek: Number(dayOfWeekStr),
        day: dayIndexToName[Number(dayOfWeekStr)],
        hours: hours.sort((a, b) => a - b),
      }))
      .sort((a, b) => {
        const valA = a.dayOfWeek === 0 ? 7 : a.dayOfWeek;
        const valB = b.dayOfWeek === 0 ? 7 : b.dayOfWeek;
        return valA - valB;
      });

    setLocalSchedule(schedule);
  }, [availability]);

  if (localSchedule.length === 0) {
    return <p className="text-center w-full col-span-2 text-muted-foreground">Cargando horario...</p>;
  }

  return (
    <>
      {localSchedule.map((data, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {data.day}
          </h4>
          <div className="flex flex-wrap gap-4">
            {data.hours.map((hour, idx) => (
              <Badge key={idx}>
                {hour <= 12 ? hour : hour % 12} {hour < 12 ? "AM" : "PM"}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
