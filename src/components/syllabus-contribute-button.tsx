"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Copy, Check, Info, FileText, Send, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SyllabusContributeButtonProps {
  className?: string;
  classNameTrigger?: string;
}

export function SyllabusContributeButton({
  className,
  classNameTrigger,
}: SyllabusContributeButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const emailAddress = "carlos.arevalo@yachaytech.edu.ec";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      toast({
        title: "¡Copiado con éxito!",
        description: "El correo ha sido copiado al portapapeles.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el correo. Inténtalo manualmente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={`gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm ${classNameTrigger}`}
          >
            <Send className="h-4 w-4" />
            ¿Cómo contribuir?
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md md:max-w-lg border border-border bg-background/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 tracking-tight">
              Contribuir al Syllabus
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm pt-2">
              Puedes colaborar con nosotros siguiendo estos pasos.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Step 1 */}
            <Card className="p-4 border bg-card/50 hover:bg-card transition-colors duration-200">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Prepara el archivo
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Asegúrate de tener el documento en formato <strong>PDF</strong>.
                    Debe contener el contenido oficial del curso.
                  </p>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-4 border bg-card/50 hover:bg-card transition-colors duration-200">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  2
                </div>
                <div className="space-y-2 w-full">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Envía el correo
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Adjunta el archivo del syllabus y envíalo a la siguiente dirección de correo de Yachay Tech:
                  </p>
                  <div className="flex items-center gap-2 bg-secondary/80 border rounded-md p-2 justify-between">
                    <code className="text-xs font-mono select-all text-primary truncate max-w-[200px] md:max-w-none">
                      {emailAddress}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-background shrink-0"
                      onClick={handleCopy}
                      title="Copiar correo"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="p-4 border bg-card/50 hover:bg-card transition-colors duration-200">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    Especifica los detalles
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    En el asunto del correo escribe: <code>Syllabus: [Nombre de la Materia]</code>.
                    En el mensaje indícanos el año, semestre (ej. 2024-1).
                  </p>
                </div>
              </div>
            </Card>

            {/* Step 4*/}
            <Card className="p-4 border bg-card/50 hover:bg-card transition-colors duration-200">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  4
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    Gana un logro
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Si es la primera vez que contribuyes, recibirás un logro en tu perfil una vez que tu aportación sea comprobada.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-end pt-2">
            <Button asChild className="w-full sm:w-auto">
              <a href={`mailto:${emailAddress}?subject=Contribucion%20de%20Syllabus`}>
                <Send className="mr-2 h-4 w-4" />
                Redactar Correo Directo
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
