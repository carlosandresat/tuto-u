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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { UserAvailabilitySchema } from "@/schemas";
import { objectMap } from "@/lib/utils";
import { updateUserAvailability } from "@/actions/user-configuration";

export function ProfileAvailabilityForm({
  userId,
  availabilityConfig,
}: {
  userId: string;
  availabilityConfig: { dayOfWeek: number; timeSlot: number }[];
}) {
  const [isPending, startTransition] = useTransition();

  const localAvailabilities = availabilityConfig.map((row) => {
    const localHour = new Date();
    localHour.setUTCHours(row.timeSlot);
    return { dayOfWeek: row.dayOfWeek, timeSlot: localHour.getHours() };
  });
  const mondayAvailability = localAvailabilities
    .filter((row) => row.dayOfWeek == 0)
    .map((row) => row.timeSlot);
  const tuesdayAvailability = localAvailabilities
    .filter((row) => row.dayOfWeek == 1)
    .map((row) => row.timeSlot);
  const wednesdayAvailability = localAvailabilities
    .filter((row) => row.dayOfWeek == 2)
    .map((row) => row.timeSlot);
  const thursdayAvailability = localAvailabilities
    .filter((row) => row.dayOfWeek == 3)
    .map((row) => row.timeSlot);
  const fridayAvailability = localAvailabilities
    .filter((row) => row.dayOfWeek == 4)
    .map((row) => row.timeSlot);
  const saturdayAvailability = localAvailabilities
    .filter((row) => row.dayOfWeek == 5)
    .map((row) => row.timeSlot);
  const sundayAvailability = localAvailabilities
    .filter((row) => row.dayOfWeek == 6)
    .map((row) => row.timeSlot);

  const form = useForm<z.infer<typeof UserAvailabilitySchema>>({
    resolver: zodResolver(UserAvailabilitySchema),
    defaultValues: {
      mondayAvailability,
      tuesdayAvailability,
      wednesdayAvailability,
      thursdayAvailability,
      fridayAvailability,
      saturdayAvailability,
      sundayAvailability,
    },
  });

  const toUTCAvailability = (data: z.infer<typeof UserAvailabilitySchema>) => {
    const transformFunction = (day: number[]) => {
      const UTCDay = day.map((hour) => {
        const time = new Date();
        time.setHours(hour);
        return time.getUTCHours();
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
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" aria-label="Toggle 2pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" aria-label="Toggle 10pm">
                    10pm
                  </ToggleGroupItem>
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
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" aria-label="Toggle 2pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" aria-label="Toggle 10pm">
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
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" aria-label="Toggle 2pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" aria-label="Toggle 10pm">
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
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" aria-label="Toggle 2pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" aria-label="Toggle 10pm">
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
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" aria-label="Toggle 2pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" aria-label="Toggle 10pm">
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
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" aria-label="Toggle 2pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" aria-label="Toggle 10pm">
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
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="8" aria-label="Toggle 8am">
                    8am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" aria-label="Toggle 10am">
                    10am
                  </ToggleGroupItem>
                  <ToggleGroupItem value="12" aria-label="Toggle 2pm">
                    12pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="14" aria-label="Toggle 2pm">
                    2pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="16" aria-label="Toggle 4pm">
                    4pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="18" aria-label="Toggle 6pm">
                    6pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="20" aria-label="Toggle 8pm">
                    8pm
                  </ToggleGroupItem>
                  <ToggleGroupItem value="22" aria-label="Toggle 10pm">
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
