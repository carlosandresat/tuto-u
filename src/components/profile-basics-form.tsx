"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

import { UserBasicsSchema } from "@/schemas";
import { updateUserDescription } from "@/actions/user-configuration";
import { Input } from "@/components/ui/input";

export function ProfileBasicsForm({
  userId,
  descriptionConfig,
  whatsappConfig,
}: {
  userId: string;
  descriptionConfig: string;
  whatsappConfig: string;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserBasicsSchema>>({
    resolver: zodResolver(UserBasicsSchema),
    defaultValues: {
      description: descriptionConfig,
      whatsapp: whatsappConfig,
    },
  });

  function onSubmit(data: z.infer<typeof UserBasicsSchema>) {
    startTransition(async () => {
      await updateUserDescription(data, userId);
      toast({
        title: "¡Has actualizado tu información básica!",
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Descripción:</FormLabel>
              <FormControl>
                <Textarea
                  className=" max-w-screen-sm"
                  placeholder="Ingresa una descripción..."
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Número de WhatsApp:</FormLabel>
              <FormControl>
                <Input
                  className=" max-w-screen-sm"
                  placeholder="Ejemplo: +593987654321"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>Incluye el código de país (+593 para Ecuador). No añadas espacios ni guiones. Debe estar todo junto. Por ejemplo, si tu número es 0987654321 debes poner +593987654321</FormDescription>
              <FormMessage></FormMessage>
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
