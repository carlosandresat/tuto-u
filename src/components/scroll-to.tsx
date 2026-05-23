"use client";

import React from "react";

export default function ScrollElement({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const handleScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return <div onClick={handleScroll}>{children}</div>;
}
