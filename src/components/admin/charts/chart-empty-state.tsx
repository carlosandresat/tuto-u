export function ChartEmptyState({
  message = "Aún no hay datos suficientes para este gráfico.",
}: {
  message?: string;
}) {
  return (
    <div className="flex aspect-video items-center justify-center text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
