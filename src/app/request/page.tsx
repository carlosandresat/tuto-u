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
import { useState } from "react";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  course: z.string(),
});

export default function Component() {
  const [isOnline, setIsOnline] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
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
                              <SelectItem value="Tu ñaña">Cálculo 1</SelectItem>
                              <SelectItem value="Curso de Razonamiento">
                                Cálculo 2
                              </SelectItem>
                              <SelectItem value="Curso para carreras especializadas">
                                Física
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full md:w-[240px] pl-3 text-left font-normal",
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
                </form>
              </Form>
              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Select>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duración</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                    <SelectItem value="90">90 minutos</SelectItem>
                    <SelectItem value="120">120 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="items-top flex space-x-2 py-4">
                <Checkbox
                  id="online"
                  checked={isOnline}
                  onCheckedChange={() => setIsOnline(!isOnline)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="online"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Online
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Si seleccionas esta opción el tutor te enviará un enlace
                    para la sesión.
                  </p>
                </div>
              </div>{" "}
              <div className={cn("space-y-2 block", isOnline && "hidden")}>
                <Label htmlFor="place">Lugar</Label>
                <Input id="place" placeholder="Biblioteca, aula, salón" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Tema</Label>
                <Input
                  id="topic"
                  placeholder="Ingresa el tema para la sesión"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-max">Solicitar tutoría</Button>
            </CardFooter>
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
                  <Badge className=" bg-yellow-400">Premium</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Tutor description goes here. This is a brief introduction of
                  the tutor.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="#" className="flex justify-center w-full">
                <Button variant="secondary" className="w-full md:w-auto">
                  Ver perfil
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
