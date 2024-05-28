"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useEffect } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { UserAvailabilitySchema } from "@/schemas";
import { objectMap } from "@/lib/utils";
import { updateUserAvailability } from "@/actions/user-configuration";

export function ProfileAvailabilityForm({
  userId,
  timeOptions,
  mondayAvailability,
  tuesdayAvailability,
  wednesdayAvailability,
  thursdayAvailability,
  fridayAvailability,
  saturdayAvailability,
  sundayAvailability,
}: {
  userId: string;
  timeOptions: string[],
  mondayAvailability: number[];
  tuesdayAvailability: number[];
  wednesdayAvailability: number[];
  thursdayAvailability: number[];
  fridayAvailability: number[];
  saturdayAvailability: number[];
  sundayAvailability: number[];
}) {
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof UserAvailabilitySchema>>({
    resolver: zodResolver(UserAvailabilitySchema),
    defaultValues: {
      mondayAvailability: [],
      tuesdayAvailability: [],
      wednesdayAvailability: [],
      thursdayAvailability: [],
      fridayAvailability: [],
      saturdayAvailability: [],
      sundayAvailability: [],
    },
  });

  useEffect(() => {
    const updateViews = async () => {
      form.setValue("mondayAvailability", mondayAvailability.map((hourUTC) => {
        const localHour = new Date();
        localHour.setUTCHours(hourUTC);
        return localHour.getHours().toString();
      }))
      form.setValue("tuesdayAvailability", tuesdayAvailability.map((hourUTC) => {
        const localHour = new Date();
        localHour.setUTCHours(hourUTC);
        return localHour.getHours().toString();
      }))
      form.setValue("wednesdayAvailability", wednesdayAvailability.map((hourUTC) => {
        const localHour = new Date();
        localHour.setUTCHours(hourUTC);
        return localHour.getHours().toString();
      }))
      form.setValue("thursdayAvailability", thursdayAvailability.map((hourUTC) => {
        const localHour = new Date();
        localHour.setUTCHours(hourUTC);
        return localHour.getHours().toString();
      }))
      form.setValue("fridayAvailability", fridayAvailability.map((hourUTC) => {
        const localHour = new Date();
        localHour.setUTCHours(hourUTC);
        return localHour.getHours().toString();
      }))
      form.setValue("saturdayAvailability", saturdayAvailability.map((hourUTC) => {
        const localHour = new Date();
        localHour.setUTCHours(hourUTC);
        return localHour.getHours().toString();
      }))
      form.setValue("sundayAvailability", sundayAvailability.map((hourUTC) => {
        const localHour = new Date();
        localHour.setUTCHours(hourUTC);
        return localHour.getHours().toString();
      }))
    }
 
    updateViews()
  }, [])

  const toUTCAvailability = (data: z.infer<typeof UserAvailabilitySchema>) => {
    const transformFunction = (day: string[]) => {
      const UTCDay = day.map((hour) => {
        const time = new Date();
        time.setHours(Number(hour));
        return time.getUTCHours().toString();
      });

      return UTCDay;
    };

    const newData = objectMap(data, transformFunction);
    return newData;
  };

  function onSubmit(data: z.infer<typeof UserAvailabilitySchema>) {
    startTransition(async () => {
      const dataUTC = toUTCAvailability(data) as z.infer<
        typeof UserAvailabilitySchema
      >;
      updateUserAvailability(dataUTC, userId);
      toast({
        title: "¡Se han actualizado tu horario disponible!",
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Lunes
        </h3>
        <FormField
          control={form.control}
          name="mondayAvailability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {timeOptions.map((hour, index)=>
                  <ToggleGroupItem value={hour.toString()} key={index} aria-label={ Number(hour)<=12 ? `Toggle ${hour}am` : `Toggle ${Number(hour)%12}pm`}>
                  { Number(hour)<=12 ? `${hour}am` : `${Number(hour)%12}pm`}
                </ToggleGroupItem>)}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Martes
        </h3>
        <FormField
          control={form.control}
          name="tuesdayAvailability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={tuesdayAvailability.map((hourUTC) => {
                    const localHour = new Date();
                    localHour.setUTCHours(hourUTC);
                    return localHour.getHours().toString();
                  })}
                >
                  <ToggleGroupItem value="8" key="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" key="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" key="12" aria-label="Toggle 12pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" key="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" key="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" key="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" key="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" key="22" aria-label="Toggle 10pm">
                    10pm
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Miércoles
        </h3>
        <FormField
          control={form.control}
          name="wednesdayAvailability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={wednesdayAvailability.map((hourUTC) => {
                    const localHour = new Date();
                    localHour.setUTCHours(hourUTC);
                    return localHour.getHours().toString();
                  })}
                >
                  <ToggleGroupItem value="8" key="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" key="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" key="12" aria-label="Toggle 12pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" key="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" key="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" key="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" key="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" key="22" aria-label="Toggle 10pm">
                    10pm
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Jueves
        </h3>
        <FormField
          control={form.control}
          name="thursdayAvailability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={thursdayAvailability.map((hourUTC) => {
                    const localHour = new Date();
                    localHour.setUTCHours(hourUTC);
                    return localHour.getHours().toString();
                  })}
                >
                  <ToggleGroupItem value="8" key="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" key="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" key="12" aria-label="Toggle 12pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" key="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" key="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" key="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" key="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" key="22" aria-label="Toggle 10pm">
                    10pm
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Viernes
        </h3>
        <FormField
          control={form.control}
          name="fridayAvailability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={fridayAvailability.map((hourUTC) => {
                    const localHour = new Date();
                    localHour.setUTCHours(hourUTC);
                    return localHour.getHours().toString();
                  })}
                >
                  <ToggleGroupItem value="8" key="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" key="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" key="12" aria-label="Toggle 12pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" key="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" key="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" key="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" key="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" key="22" aria-label="Toggle 10pm">
                    10pm
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Sábado
        </h3>
        <FormField
          control={form.control}
          name="saturdayAvailability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={saturdayAvailability.map((hourUTC) => {
                    const localHour = new Date();
                    localHour.setUTCHours(hourUTC);
                    return localHour.getHours().toString();
                  })}
                >
                  <ToggleGroupItem value="8" key="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" key="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" key="12" aria-label="Toggle 12pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" key="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" key="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" key="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" key="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" key="22" aria-label="Toggle 10pm">
                    10pm
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Domingo
        </h3>
        <FormField
          control={form.control}
          name="sundayAvailability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={sundayAvailability.map((hourUTC) => {
                    const localHour = new Date();
                    localHour.setUTCHours(hourUTC);
                    return localHour.getHours().toString();
                  })}
                >
                  <ToggleGroupItem value="8" key="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" key="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" key="12" aria-label="Toggle 12pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" key="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" key="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" key="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" key="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" key="22" aria-label="Toggle 10pm">
                    10pm
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          Guardar
        </Button>
      </form>
    </Form>
  );
}
