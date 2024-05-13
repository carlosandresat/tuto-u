"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
import { IndividualSessionRequestSchema } from "@/schemas";
import { getAvailableTutors } from "@/actions/session-request";
import { useState } from "react";

export function IndividualSessionForm() {
  const [availableTutors, setAvailableTutors] = useState<
    {
      id: string;
      name: string;
      pricing: { duration: number; price: string }[];
    }[]
  >([]);
  const form = useForm<z.infer<typeof IndividualSessionRequestSchema>>({
    resolver: zodResolver(IndividualSessionRequestSchema),
    defaultValues: {
      place: "",
      isOnline: false,
    },
  });

  const courses = [
    { id: 1, course: "Cálculo 1" },
    { id: 2, course: "Cálculo 2" },
    { id: 3, course: "Cálculo 3" },
    { id: 4, course: "Algebra Lineal" },
    { id: 5, course: "Química 1" },
    { id: 6, course: "Química 2" },
    { id: 7, course: "Física 1" },
    { id: 8, course: "Física 2" },
    { id: 9, course: "Biología 1" },
    { id: 10, course: "Biología 2" },
    { id: 11, course: "Ciencias de la Tierra" },
    { id: 12, course: "Probabilidad y Estadística" },
    { id: 13, course: "Introducción a la Programación" },
    { id: 14, course: "Ecuaciones Diferenciales" },
    { id: 15, course: "Métodos Numéricos" },
    { id: 16, course: "Inglés" },
  ];

  function formatDuration(duration:number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (minutes === 0) {
      // Return just the hours if there are no extra minutes
      return `${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      // Convert the minutes to a decimal fraction
      const decimal = minutes / 60;
      return `${hours + decimal} horas`; // Adds the decimal to hours
    }
  }
  function onSubmit(data: z.infer<typeof IndividualSessionRequestSchema>) {
    const datetime = new Date(data.date);
    datetime.setHours(parseInt(data.time.split(":")[0]));
    datetime.setMinutes(parseInt(data.time.split(":")[1]));
    console.log(datetime.toISOString());
    const formattedData = {
      date: datetime.toISOString(),
      course: parseInt(data.course),
      tutor: data.tutor,
      duration: parseInt(data.duration),
      topic: data.topic,
      ...(data.isOnline ? { place: "Online" } : { place: data.place }),
      isOnline: data.isOnline,
    };
    toast({
      title: "Felicidades",
      description: (
        <>
          <p>¡Gracias por probar nuestro formulario!</p>
          <pre className="mt-2 w-[340px] rounded-md bg-secondary p-4">
            <code>
              {JSON.stringify(
                { ...formattedData, date: datetime.toLocaleString() },
                null,
                2
              )}
            </code>
          </pre>
        </>
      ),
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
                  onValueChange={async (e) => {
                    field.onChange(e);
                    form.setValue("tutor", "");
                    if (
                      form.getValues("date") !== undefined &&
                      form.getValues("time") !== undefined
                    ) {
                      const localHour = new Date();
                      localHour.setHours(
                        parseInt(form.getValues("time").split(":")[0], 10)
                      );
                      setAvailableTutors(
                        await getAvailableTutors(
                          parseInt(form.getValues("course")),
                          form.getValues("date").getDay(),
                          localHour.getUTCHours()
                        )
                      );
                    }
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((row) => (
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
                        form.setValue("tutor", "");
                        if (
                          form.getValues("course") !== undefined &&
                          form.getValues("time") !== undefined
                        ) {
                          const localHour = new Date();
                          localHour.setHours(
                            parseInt(form.getValues("time").split(":")[0], 10)
                          );
                          console.log(
                            await getAvailableTutors(
                              parseInt(form.getValues("course")),
                              form.getValues("date").getDay(),
                              localHour.getUTCHours()
                            )
                          );
                          setAvailableTutors(
                            await getAvailableTutors(
                              parseInt(form.getValues("course")),
                              form.getValues("date").getDay(),
                              localHour.getUTCHours()
                            )
                          );
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
                      form.setValue("tutor", "");
                      if (
                        form.getValues("date") !== undefined &&
                        form.getValues("course") !== undefined
                      ) {
                        const localHour = new Date();
                        localHour.setHours(
                          parseInt(form.getValues("time").split(":")[0], 10)
                        );
                        setAvailableTutors(
                          await getAvailableTutors(
                            parseInt(form.getValues("course")),
                            form.getValues("date").getDay(),
                            localHour.getUTCHours()
                          )
                        );
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="12:00">12:00</SelectItem>
                      <SelectItem value="13:00">13:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                      <SelectItem value="18:00">18:00</SelectItem>
                      <SelectItem value="19:00">19:00</SelectItem>
                      <SelectItem value="20:00">20:00</SelectItem>
                      <SelectItem value="21:00">21:00</SelectItem>
                      <SelectItem value="22:00">22:00</SelectItem>
                      <SelectItem value="23:00">23:00</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="tutor"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tutor</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={
                    !form.watch("course") ||
                    !form.watch("date") ||
                    !form.watch("time") ||
                    form.watch("time") === "0"
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tutor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTutors.map((row, index) => (
                      <SelectItem value={row.id} key={index}>
                        {row.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-6 flex-col items-center md:flex-row">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Duración</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch("tutor")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una duración" />
                    </SelectTrigger>
                    <SelectContent>
                      {form.getValues("tutor") !== undefined && form.getValues("tutor") !== "" ? availableTutors
                        .filter((row) => row.id === form.getValues("tutor"))[0]
                        .pricing.map((row, index) => (
                          <SelectItem value={row.duration.toString()} key={index}>
                            {formatDuration(row.duration)}
                          </SelectItem>
                        )):null}
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
        <Button className="w-full md:w-max" type="submit">
          Solicitar tutoría
        </Button>
      </form>
    </Form>
  );
}
