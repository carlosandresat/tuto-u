"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Suppress the false-positive React 19 warning about script tags inside components.
  // This is a known compatibility issue with next-themes in React 19 / Next.js 15+.
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const orig = console.error;
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
        return;
      }
      orig.apply(console, args);
    };
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
