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
import { AchievementsDialog } from "@/components/achievements-dialog";
import { useState } from "react";

const FormSchema = z.object({
  date: z.date({
    required_error: "Tienes que escoger una fecha.",
  }),
  course: z.string({
    required_error: "Tienes que escoger un curso.",
  }),
  time: z.string({
    required_error: "Tienes que escoger una hora.",
  }),
  tutor: z.string({
    required_error: "Tienes que escoger un tutor.",
  }),
  duration: z.string({
    required_error: "Tienes que escoger una duración.",
  }),
  topic: z
    .string({
      required_error: "Tienes que ingresar un tema.",
    })
    .min(5, "Minimo 5 caracteres")
    .max(100, "Maximo 100 caracteres"),
  place: z.string().optional(),
  isOnline: z.boolean(),
});

export default function Component() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      //course: "2",
      place: "",
      isOnline: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const datetime = new Date(data.date);
    datetime.setHours(parseInt(data.time.split(":")[0]));
    datetime.setMinutes(parseInt(data.time.split(":")[1]));
    console.log(datetime.toISOString());
    const formattedData = {
      date: datetime.toISOString(),
      course: parseInt(data.course),
      tutor: parseInt(data.tutor),
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
    <>
      <section className="md:min-h-screen w-full p-6 md:p-12 items-center justify-center flex">
        {/* Button Back */}
        <Link href="/home" className="absolute top-0 left-0 p-6">
          <Button variant="link">
            <ArrowLeft className="mr-2" /> Regresar
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row gap-6 max-w-screen-2xl w-full mt-12">
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <CardTitle>Solicitar Tutoría</CardTitle>
              <CardDescription>
                Llena los siguientes campos para solicitar una tutoría.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Curso</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu curso" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Cálculo 1</SelectItem>
                              <SelectItem value="2">Cálculo 2</SelectItem>
                              <SelectItem value="3">Física</SelectItem>
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
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
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una hora" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="07:00">07:00</SelectItem>
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
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tutor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">
                                Tutor
                              </SelectItem>

                              <SelectItem value="2">
                                Tutor 2
                              </SelectItem>
                              <SelectItem value="3">Tutor 3</SelectItem>
                              <SelectItem value="4">Tutor 4</SelectItem>
                              <SelectItem value="5">Tutor 5</SelectItem>
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
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una duración" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="60">1 hora</SelectItem>
                                <SelectItem value="90">
                                  1 hora y media
                                </SelectItem>
                                <SelectItem value="120">2 horas</SelectItem>
                                <SelectItem value="150">
                                  2 horas y media
                                </SelectItem>
                                <SelectItem value="180">3 horas</SelectItem>
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
                              Si seleccionas esta opción, el tutor te enviará un
                              enlace de Zoom para la tutoría.
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
                          <Textarea
                            {...field}
                            placeholder="Detalla tu tema de interés"
                          />
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
                          Si no tienes un lugar específico, puedes dejar este
                          campo en blanco y el tutor responderá con una
                          sugerencia.
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
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Detalles del tutor</CardTitle>
              <CardDescription>
                Información acerca del tutor seleccionado.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src="/photos/carlos.arevalo.jpg"
                  alt="Carlos Arévalo"
                ></AvatarImage>
                <AvatarFallback className="text-3xl">CA</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Tutor Name</h2>
                <div className="flex justify-center items-center mt-2 gap-x-2 flex-wrap gap-y-2">
                  <Badge className="">Rating: 4.7</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Aquí viene la descripción del tutor. Esta es una breve
                  descripción del tutor.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <AchievementsDialog></AchievementsDialog>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
