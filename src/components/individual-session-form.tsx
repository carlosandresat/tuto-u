"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { AchievementsDialog } from "@/components/achievements-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import {
  getAvailableTutors,
  requestIndividualSession,
  addNarcissismAchievement,
} from "@/actions/session-request";
import { useState, useTransition, useEffect } from "react";

export function IndividualSessionForm({
  userId,
  courses,
}: {
  userId: string;
  courses: { id: number; name: string }[];
}) {
  const [isPending, startTransition] = useTransition();
  const [isFetchingTutors, setIsFetchingTutors] = useState(false);

  const [availableTutors, setAvailableTutors] = useState<
    {
      id: string;
      name: string;
      email: string | null;
      nameInitials: string;
      image: string | null;
      pricing: { duration: number; price: string }[];
      description: string | null;
    }[]
  >([]);

  const form = useForm<z.infer<typeof IndividualSessionRequestSchema>>({
    resolver: zodResolver(IndividualSessionRequestSchema),
    defaultValues: {
      place: "",
      isOnline: false,
    },
  });

  const selectedCourse = form.watch("course");
  const selectedDate = form.watch("date");
  const selectedTime = form.watch("time");

  // Fetch available tutors in a consolidated, race-condition protected hook
  useEffect(() => {
    if (!selectedCourse || !selectedDate || !selectedTime) {
      setAvailableTutors([]);
      return;
    }

    const fetchTutors = async () => {
      setIsFetchingTutors(true);
      try {
        const sessionDate = new Date(selectedDate);
        const [hours, minutes] = selectedTime.split(":").map(Number);
        sessionDate.setHours(hours, minutes, 0, 0);

        const utcDayOfWeek = sessionDate.getUTCDay();
        const utcHour = sessionDate.getUTCHours();

        const tutors = await getAvailableTutors(
          parseInt(selectedCourse),
          utcDayOfWeek,
          utcHour
        );
        setAvailableTutors(tutors);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los tutores disponibles.",
          variant: "destructive",
        });
      } finally {
        setIsFetchingTutors(false);
      }
    };

    fetchTutors();
  }, [selectedCourse, selectedDate, selectedTime]);

  function formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) {
      return `${minutes} minutos`;
    }
    if (minutes === 0) {
      return `${hours} hora${hours > 1 ? "s" : ""}`;
    } else {
      const decimal = minutes / 60;
      return `${hours + decimal} horas`;
    }
  }

  function onSubmit(data: z.infer<typeof IndividualSessionRequestSchema>) {
    startTransition(async () => {
      const datetime = new Date(data.date);
      const selectedTutorPricing = availableTutors.find((row) => row.id === data.tutor)?.pricing;
      const pricingConfig = selectedTutorPricing?.find((row) => row.duration.toString() === data.duration);
      
      if (!pricingConfig) {
        toast({
          title: "Error",
          description: "No se pudo encontrar la configuración de precio para este tutor.",
          variant: "destructive",
        });
        return;
      }

      const selectedPrice = pricingConfig.price;
      datetime.setHours(parseInt(data.time.split(":")[0]));
      datetime.setMinutes(parseInt(data.time.split(":")[1]));

      const formattedData = {
        studentId: userId,
        tutorId: data.tutor,
        courseId: parseInt(data.course),
        sessionDateTime: datetime.toISOString(),
        duration: parseInt(data.duration),
        price: Number(selectedPrice),
        place: data.isOnline
          ? "Virtual"
          : data.place !== undefined && data.place !== ""
          ? data.place
          : "A disposición del tutor",
        online: data.isOnline,
        topic: data.topic,
      };

      if (data.tutor === userId) {
        const res = await addNarcissismAchievement(userId);
        if (res.message !== undefined) {
          toast({
            title: "Logro obtenido",
            description: res.message,
          });
        }
      } else {
        const res = await requestIndividualSession(formattedData);
        if (res.error_message) {
          toast({
            title: "Error",
            description: res.error_message,
          });
        }
      }
    });
  }

  const selectedTutorId = form.watch("tutor");
  const selectedTutor = availableTutors.find((t) => t.id === selectedTutorId);
  const selectedDuration = form.watch("duration");
  const selectedPriceInfo = selectedTutor?.pricing.find((p) => p.duration.toString() === selectedDuration);

  return (
    <>
      <Card className="w-full md:w-2/3">
        <CardHeader>
          <CardTitle>Formulario de Solicitud</CardTitle>
          <CardDescription>
            Llena los siguientes campos para solicitar una tutoría.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Curso</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                          form.setValue("duration", "");
                          form.setValue("tutor", "");
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
                              <CalendarIcon data-icon="inline-end" className="ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(e) => {
                              field.onChange(e);
                              form.setValue("duration", "");
                              form.setValue("tutor", "");
                            }}
                            disabled={(date) => {
                              const now = new Date();
                              now.setHours(0, 0, 0, 0);
                              return date < now;
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
                          onValueChange={(e) => {
                            field.onChange(e);
                            form.setValue("duration", "");
                            form.setValue("tutor", "");
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
                        onValueChange={(e) => {
                          field.onChange(e);
                          form.setValue("duration", "");
                        }}
                        value={field.value}
                        disabled={
                          isFetchingTutors ||
                          !form.watch("course") ||
                          !form.watch("date") ||
                          !form.watch("time")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isFetchingTutors
                                ? "Cargando tutores disponibles..."
                                : "Selecciona un tutor"
                            }
                          />
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
                          value={field.value}
                          disabled={!form.watch("tutor")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una duración" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedTutor
                              ? selectedTutor.pricing.map((row, index) => (
                                  <SelectItem
                                    value={row.duration.toString()}
                                    key={index}
                                  >
                                    {formatDuration(row.duration)}
                                  </SelectItem>
                                ))
                              : null}
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
                    <FormItem className="flex flex-row items-start gap-3 rounded-md border p-4 w-full">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
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
                      Si no tienes un lugar específico, puedes dejar este campo
                      en blanco y el tutor responderá con una sugerencia.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full md:w-max"
                type="submit"
                disabled={isPending}
              >
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
        <CardContent className="flex flex-col items-center gap-4">
          {selectedTutor ? (
            <>
              <Avatar className="size-32">
                <AvatarImage
                  src={
                    selectedTutor.image
                      ? `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/profile-pictures/${selectedTutor.image}`
                      : undefined
                  }
                  alt="Tutor Pic"
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl">
                  {selectedTutor.nameInitials}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {selectedTutor.name}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  {selectedTutor.description || "Sin descripción disponible."}
                </p>

                {selectedPriceInfo && (
                  <h2 className="text-xl font-semibold mt-4">
                    {`$ ${Number(selectedPriceInfo.price).toFixed(2)}`}
                  </h2>
                )}
              </div>
              <AchievementsDialog userId={selectedTutor.id} />
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm flex flex-col gap-2">
              <p>Selecciona un tutor para ver sus detalles de perfil y tarifas.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
