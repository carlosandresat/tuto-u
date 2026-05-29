"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  size?: "default" | "xl" | "2xl" | "full";
}

export function Footer({ size = "default", className, ...props }: FooterProps) {
  return (
    <footer className={cn("w-full border-t bg-background py-6 mt-auto", className)} {...props}>
      <div
        className={cn(
          "mx-auto flex flex-col md:flex-row items-center gap-4 px-4 sm:px-6 lg:px-8 w-full",
          {
            "max-w-7xl": size === "default",
            "max-w-screen-xl": size === "xl",
            "max-w-screen-2xl": size === "2xl",
            "max-w-none": size === "full",
          }
        )}
      >
        <p className="text-xs text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} Tuto-U. Todos los derechos reservados. Desarrollado por{" "}
          <span className="font-bold text-foreground">Tuto-U Team</span>.
        </p>
        <nav className="md:ml-auto flex gap-4 md:gap-6 items-center">
          <Link className="text-xs text-muted-foreground hover:underline hover:text-foreground underline-offset-4" href="#">
            Términos y condiciones
          </Link>
          <Link className="text-xs text-muted-foreground hover:underline hover:text-foreground underline-offset-4" href="#">
            Privacidad
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </footer>
  );
}
