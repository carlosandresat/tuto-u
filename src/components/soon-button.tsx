"use client"

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export function SoonButton() {
  return (
    <Button className="w-full md:w-auto" onClick={()=> toast({title: "Espéranos", description: "Pronto integraremos esta funcionalidad"})}>Ver Logros</Button>
  );
}
