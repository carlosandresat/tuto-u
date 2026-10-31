"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicPeriodSchema } from "@/schemas";
import { createAcademicPeriod } from "@/actions/mentors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function PeriodForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AcademicPeriodSchema>>({
    resolver: zodResolver(AcademicPeriodSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      startsOn: "",
      endsOn: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AcademicPeriodSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const response = await createAcademicPeriod(values);
      setError(response.error);
      setSuccess(response.success);
      if (response.success) form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año</FormLabel>
                <FormControl>
                  <Input {...field} type="number" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periodo</FormLabel>
                {/* `?? ""` mantiene el Select controlado: con `undefined` tras
                    form.reset() Radix conserva la opción anterior en pantalla y
                    volver a escogerla no dispara onValueChange. */}
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="I o II" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">I</SelectItem>
                    <SelectItem value="2">II</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startsOn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primer día</FormLabel>
                <FormControl>
                  <Input {...field} type="date" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endsOn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Último día</FormLabel>
                <FormControl>
                  <Input {...field} type="date" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription>
          Fechas en hora de Ecuador. Al crear el periodo se crea también su logro
          &quot;Mentor&quot;.
        </FormDescription>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          Crear periodo
        </Button>
      </form>
    </Form>
  );
}
