"use client";

import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { UserPricingSchema } from "@/schemas";
import { updateUserPricing } from "@/actions/user-configuration";
import { Decimal } from "@prisma/client/runtime/library";

export function ProfilePricingForm({
  userId,
  pricingConfig,
}: {
  userId: string;
  pricingConfig: { duration: number; price: Decimal }[];
}) {
  const [isPending, startTransition] = useTransition();
  const durations = pricingConfig.map((row) => {
    return `${row.duration / 60}h`.replace(".0", "");
  });

  let priceOneHour: number | undefined;
  let priceOneHalfHour: number | undefined;
  let priceTwoHours: number | undefined;
  let priceTwoHalfHours: number | undefined;
  let priceThreeHours: number | undefined;

  pricingConfig.forEach((row) => {
    switch (row.duration) {
      case 60:
        priceOneHour = Number(row.price);
        break;
      case 90:
        priceOneHalfHour = Number(row.price);
        break;
      case 120:
        priceTwoHours = Number(row.price);
        break;
      case 150:
        priceTwoHalfHours = Number(row.price);
        break;
      case 180:
        priceThreeHours = Number(row.price);
        break;
      default:
        // No action needed for unspecified durations
        break;
    }
  });

  const form = useForm<z.infer<typeof UserPricingSchema>>({
    resolver: zodResolver(UserPricingSchema),
    defaultValues: {
      durations,
      priceOneHour,
      priceOneHalfHour,
      priceTwoHalfHours,
      priceTwoHours,
      priceThreeHours,
    },
  });

  function onSubmit(data: z.infer<typeof UserPricingSchema>) {
    startTransition(async () => {
      await updateUserPricing(data, userId);
      toast({
        title: "¡Se han actualizado los precios de tus tutorías!",
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex items-center justify-center space-x-4 md:space-x-8">
          <FormField
            control={form.control}
            name="durations"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    className="lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ToggleGroupItem value="1h" aria-label="Toggle 1h">
                      1 hora
                    </ToggleGroupItem>
                    <ToggleGroupItem value="1.5h" aria-label="Toggle 1.5h">
                      1 hora 30 minutos
                    </ToggleGroupItem>
                    <ToggleGroupItem value="2h" aria-label="Toggle 2h">
                      2 horas
                    </ToggleGroupItem>
                    <ToggleGroupItem value="2.5h" aria-label="Toggle 2.5h">
                      2 horas 30 minutos
                    </ToggleGroupItem>
                    <ToggleGroupItem value="3h" aria-label="Toggle 3h">
                      3 horas
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center flex-col space-y-2">
            <FormField
              control={form.control}
              name="priceOneHour"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={`flex items-center justify-center ${
                        !form.watch("durations").includes("1h")
                          ? "invisible"
                          : null
                      }`}
                    >
                      <DollarSign />

                      <Input
                        type="number"
                        className="input"
                        placeholder="Precio"
                        step="0.5"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceOneHalfHour"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={`flex items-center justify-center ${
                        !form.watch("durations").includes("1.5h")
                          ? "invisible"
                          : null
                      }`}
                    >
                      <DollarSign />
                      <Input
                        type="number"
                        className="input"
                        placeholder="Precio"
                        step="0.5"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceTwoHours"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={`flex items-center justify-center ${
                        !form.watch("durations").includes("2h")
                          ? "invisible"
                          : null
                      }`}
                    >
                      <DollarSign />
                      <Input
                        type="number"
                        className="input"
                        placeholder="Precio"
                        step="0.5"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceTwoHalfHours"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={`flex items-center justify-center ${
                        !form.watch("durations").includes("2.5h")
                          ? "invisible"
                          : null
                      }`}
                    >
                      <DollarSign />
                      <Input
                        type="number"
                        className="input"
                        placeholder="Precio"
                        step="0.5"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceThreeHours"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={`flex items-center justify-center ${
                        !form.watch("durations").includes("3h")
                          ? "invisible"
                          : null
                      }`}
                    >
                      <DollarSign />
                      <Input
                        type="number"
                        className="input"
                        placeholder="Precio"
                        step="0.5"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          Guardar
        </Button>
      </form>
    </Form>
  );
}
