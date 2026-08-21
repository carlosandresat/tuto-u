"use client";

import * as React from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";

type TextVariant = "dark" | "light";

/**
 * Clases definidas en `globals.css`. Redefinen los tokens de texto/borde del
 * nodo capturado para que el PNG transparente sea legible sobre un fondo
 * claro (`dark` = texto oscuro) o sobre uno oscuro (`light` = texto claro).
 */
const TEXT_VARIANT_CLASS: Record<TextVariant, string> = {
  dark: "chart-export-text-dark",
  light: "chart-export-text-light",
};

/** Marcas diacríticas combinantes que deja `normalize("NFD")` (á -> a + ́). */
const DIACRITICS = /[̀-ͯ]/g;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** `tutores-por-curso` -> `tutores-por-curso-2026-08-21.png` */
function buildFilename(filename: string) {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;

  return `${slugify(filename) || "grafico"}-${stamp}.png`;
}

/**
 * html-to-image clona los subárboles SVG tal cual: no les copia los estilos
 * computados, y las reglas CSS del documento no viajan al SVG independiente
 * que termina rasterizando. Recharts pinta los ticks con `fill="#666"` y la
 * grilla con `stroke="#ccc"` como atributos de presentación, así que sin este
 * paso el PNG sale siempre con esos colores fijos y el selector de texto
 * claro/oscuro no tendría ningún efecto sobre los ejes.
 *
 * Copiamos el `fill`/`stroke` ya resuelto por CSS a estilos inline —que sí
 * sobreviven al clon— y devolvemos una función para restaurar el DOM.
 */
function inlineSvgPaint(root: HTMLElement) {
  const nodes = Array.from(root.querySelectorAll<SVGElement>("svg, svg *"));
  const previous = nodes.map(
    (node) => [node, node.getAttribute("style")] as const
  );

  for (const node of nodes) {
    const computed = getComputedStyle(node);
    node.style.fill = computed.fill;
    node.style.stroke = computed.stroke;
  }

  return () => {
    for (const [node, style] of previous) {
      if (style === null) node.removeAttribute("style");
      else node.setAttribute("style", style);
    }
  };
}

/**
 * html-to-image encadena `onload` -> `decode()` -> `requestAnimationFrame()`, y
 * en una pestaña en segundo plano rAF no dispara: la promesa nunca se resuelve.
 * Sin este límite, el `finally` no correría y el gráfico quedaría con los
 * colores de exportación pegados y el botón girando para siempre.
 */
function withTimeout<T>(promise: Promise<T>, ms = 20_000) {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout al generar el PNG")), ms)
    ),
  ]);
}

export function ChartExportButton({
  targetRef,
  filename,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  filename: string;
}) {
  const [textVariant, setTextVariant] = React.useState<TextVariant>("dark");
  const [isExporting, setIsExporting] = React.useState(false);

  async function handleExport() {
    const node = targetRef.current;

    if (!node) {
      toast({
        variant: "destructive",
        title: "No se pudo exportar el gráfico.",
        description: "Vuelve a cargar la página e inténtalo de nuevo.",
      });
      return;
    }

    const previousClassName = node.className;
    node.classList.add(TEXT_VARIANT_CLASS[textVariant]);
    // `getComputedStyle` dentro de `inlineSvgPaint` fuerza el recálculo de
    // estilos, así que la clase recién agregada ya está aplicada aquí.
    const restorePaint = inlineSvgPaint(node);
    setIsExporting(true);

    try {
      const options = {
        // Fijo a propósito: `devicePixelRatio` cambia según el equipo y haría
        // que el mismo gráfico se exporte con resoluciones distintas.
        pixelRatio: 3,
        // `undefined`, NO la cadena "transparent": html-to-image sólo deja el
        // canvas sin pintar cuando la opción viene vacía.
        backgroundColor: undefined,
        cacheBust: true,
      };

      // La primera pasada calienta la caché de fuentes embebidas; sin ella el
      // PNG sale a veces con la tipografía del sistema en lugar de Chakra Petch.
      await withTimeout(toPng(node, options));
      const dataUrl = await withTimeout(toPng(node, options));

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = buildFilename(filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("[chart-export] no se pudo generar el PNG", error);
      toast({
        variant: "destructive",
        title: "No se pudo generar la imagen.",
        description:
          "Vuelve a intentarlo sin cambiar de pestaña mientras se genera.",
      });
    } finally {
      restorePaint();
      node.className = previousClassName;
      setIsExporting(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Texto</span>
        <ToggleGroup
          type="single"
          size="sm"
          value={textVariant}
          onValueChange={(value) => {
            if (value) setTextVariant(value as TextVariant);
          }}
          aria-label="Color del texto en la imagen exportada"
        >
          <ToggleGroupItem
            value="dark"
            aria-label="Texto oscuro, para fondos claros"
          >
            Oscuro
          </ToggleGroupItem>
          <ToggleGroupItem
            value="light"
            aria-label="Texto claro, para fondos oscuros"
          >
            Claro
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        Descargar PNG
      </Button>
    </div>
  );
}
