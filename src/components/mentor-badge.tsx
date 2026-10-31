import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Etiqueta para tutores que son mentores en el periodo vigente. */
export function MentorBadge({ className }: { className?: string }) {
  return (
    <Badge
      className={cn("gap-1 whitespace-nowrap", className)}
      title="Mentor Yachay Tech · gratis en cursos de nivelación"
    >
      <GraduationCap className="size-3.5" aria-hidden />
      Mentor
    </Badge>
  );
}

/** "$ 5.00", o "Gratis" para 0 (mentores en nivelación). */
export function formatSessionPrice(price: number | string): string {
  const value = Number(price);
  return value === 0 ? "Gratis" : `$ ${value.toFixed(2)}`;
}
