"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { rateSession } from "@/actions/sessions-data";
import { StarHalf, Star } from "lucide-react";

import { RateSessionSchema } from "@/schemas";

export function RateForm({
  role,
  sessionId,
}: {
  role: string;
  sessionId: number;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RateSessionSchema>>({
    resolver: zodResolver(RateSessionSchema),
    defaultValues: {
      rate: 0,
    },
  });

  function onSubmit(data: z.infer<typeof RateSessionSchema>) {
    startTransition(async () => {
      await rateSession(sessionId, role, data.rate, data.comment);
      window.location.reload();
      /*const response = await login(data);
      if (response && response.error) {
        toast({
          title: "¡Error!",
          description: response.error,
        });
      }*/
    });
  }

  function DrawStar({ raiting }: { raiting: number }) {
    const numStar = raiting | 0;
    const isOdd = raiting % 1 >= 0.5 ? true : false;
    return (
      <div className="flex justify-center">
        {[...Array(Number(numStar.toFixed(0)))].map((_, i) => {
          return (
            <Star
              key={i}
              className={cn("h-6 w-6 ", i < raiting ? "fill-yellow-200" : null)}
            ></Star>
          );
        })}
        {isOdd && <StarHalf className="h-6 w-6 fill-yellow-200"></StarHalf>}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calificación</FormLabel>
              <div className="flex justify-center gap-4 items-center">
                <p>{field.value}</p>
                <DrawStar raiting={field.value}></DrawStar>
              </div>
              <FormControl>
                <div className="flex  justify-center items-center w-full gap-4">
                  <p>0</p>
                  <Slider
                    disabled={isPending}
                    value={[field.value]}
                    onValueChange={(e) => {
                      field.onChange(e[0]);
                    }}
                    min={0}
                    max={5}
                    step={0.5}
                    className="w-[70%]"
                  />
                  <p>5</p>
                </div>
              </FormControl>
              <FormDescription>
                Ingresa la calificación para tu{" "}
                {role === "student" ? "tutor" : "estudiante"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentario (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder={`Deja un comentario para tu ${
                    role === "student" ? "tutor" : "estudiante"
                  }...`}
                  {...field}
                />
              </FormControl>
              <FormDescription>Max. 50 caracteres</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          Calificar
        </Button>
      </form>
    </Form>
  );
}
