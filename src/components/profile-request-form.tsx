"use client";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileSessionRequestSchema } from "@/schemas";
import { useState, useTransition } from "react";

interface FormData {
  courses: { id: number; course: string }[];
  availability: { day: number; hours: number[] }[];
  durations: number[];
}

export function ProfileRequestForm({
  courses,
  availability,
  durations,
}: FormData) {
  const [isPending, startTransition] = useTransition();
  const [availableTimes, setAvailableTimes] = useState<number[] | undefined>();

  function formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (minutes === 0) {
      // Return just the hours if there are no extra minutes
      return `${hours} hora${hours > 1 ? "s" : ""}`;
    } else {
      // Convert the minutes to a decimal fraction
      const decimal = minutes / 60;
      return `${hours + decimal} horas`; // Adds the decimal to hours
    }
  }

  const form = useForm<z.infer<typeof ProfileSessionRequestSchema>>({
    resolver: zodResolver(ProfileSessionRequestSchema),
    defaultValues: {
      place: "",
      isOnline: false,
    },
  });

  //Pending: Order the hours in ascending order
  const availabilityLocalTimes = availability.map((a) => ({
    ...a,
    hours: a.hours.map((h) => {
      const date = new Date();
      date.setUTCHours(h);
      return date.getHours();
    }),
  })).map((a) => ({
    ...a,
    hours: a.hours.sort((a, b) => a - b),
  }));

  function onSubmit(data: z.infer<typeof ProfileSessionRequestSchema>) {
    startTransition(async () => {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="course"
          render={({ field, formState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Curso</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una asignatura" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses
                      .sort((a, b) => a.course.localeCompare(b.course))
                      .map((row) => (
                        <SelectItem
                          value={row.id.toString()}
                          key={row.id.toString()}
                        >
                          {row.course}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-6 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/y")
                        ) : (
                          <span>Escoge una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={async (e) => {
                        field.onChange(e);
                        form.setValue("time", "");
                        if (e) {
                          const day = e.getDay();
                          const availableHours =
                          availabilityLocalTimes.find((a) => a.day === day)?.hours ||
                            [];
                          setAvailableTimes(availableHours);
                        }
                      }}
                      disabled={(date) => {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        return date < yesterday;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={async (e) => {
                      field.onChange(e);
                    }}
                    value={field.value}
                    disabled={
                      !form.watch("date") || availableTimes?.length === 0
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          availableTimes?.length === 0
                            ? "No hay horario disponible este día"
                            : "Selecciona una hora"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes?.map((time) => (
                        <SelectItem
                          value={time.toString().padStart(2, "0") + ":00"}
                          key={time}
                        >
                          {time.toString().padStart(2, "0") + ":00"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6 flex-col items-center md:flex-row">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Duración</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una duración" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem value={duration.toString()} key={duration}>
                          {formatDuration(duration)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isOnline"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Checkbox>
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Online</FormLabel>
                  <FormDescription>
                    Si seleccionas esta opción, el tutor te enviará un enlace de
                    Zoom para la tutoría.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tema</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Detalla tu tema de interés" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem
              className={cn(
                "flex flex-col",
                form.watch("isOnline") && "invisible"
              )}
            >
              <FormLabel>Lugar</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Segundo piso de la biblioteca, sala de estudios 3, departamento G-201, etc."
                  disabled={form.watch("isOnline")}
                />
              </FormControl>
              <FormDescription>
                Si no tienes un lugar específico, puedes dejar este campo en
                blanco y el tutor responderá con una sugerencia.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full md:w-max" type="submit" disabled={isPending}>
          Solicitar tutoría
        </Button>
      </form>
    </Form>
  );
}
