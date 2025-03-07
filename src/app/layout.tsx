import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Chakra_Petch } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster"

import "./globals.css";

const inter = Chakra_Petch({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tutou.app"),
  title: "Tuto-U",
  description: "Tuto-U es una plataforma para tutorías entre estudiantes de la Universidad Yachay Tech. Creemos juntos un espacio de aprendizaje colaborativo para la comunidad universitaria. ¡Únete!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
