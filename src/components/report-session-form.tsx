"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { reportSession } from "@/actions/sessions-data";

import { SessionReportSchema } from "@/schemas";

export function ReportSessionForm({role, sessionId}:{role:string, sessionId:number}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SessionReportSchema>>({
    resolver: zodResolver(SessionReportSchema),
  });

  function onSubmit(data: z.infer<typeof SessionReportSchema>) {
    startTransition(async () => {
      await reportSession(sessionId, data.description, role);
      window.location.reload()
      /*const response = await login(data);
      if (response && response.error) {
        toast({
          title: "¡Error!",
          description: response.error,
        });
      }*/
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Inasistencia, incumplimiento de pago, conducta inapropiada, acoso, etc..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Lamentamos que hayas tenido una mala experiencia. Por favor coméntanos tu inconveniente durante la tutoría</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isPending} className="w-full sm:w-auto">
          Reportar
        </Button>
      </form>
    </Form>
  );
}
