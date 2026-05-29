"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: "main" | "section" | "div";
  size?: "default" | "xl" | "2xl" | "full";
  clearNavbar?: boolean;
}

export function PageContainer({
  children,
  className,
  as: Component = "main",
  size = "default",
  clearNavbar = true,
  ...props
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto flex flex-col items-center",
        // Responsive horizontal padding
        "px-4 sm:px-6 lg:px-8",
        // Max width mapping
        {
          "max-w-7xl": size === "default",
          "max-w-screen-xl": size === "xl",
          "max-w-screen-2xl": size === "2xl",
          "max-w-none": size === "full",
        },
        // Top padding to clear fixed navbar
        clearNavbar ? "pt-28 md:pt-32 pb-12" : "py-12",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
