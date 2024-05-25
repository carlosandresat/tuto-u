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
import { Input } from "@/components/ui/input";
import { login } from "@/actions/login";
import { DollarSign } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { UserBasicsSchema } from "@/schemas";
import { updateUserDescription } from "@/actions/user-configuration";
import { Decimal } from "@prisma/client/runtime/library";

export function ProfileBasicsForm({userId, descriptionConfig}: {userId:string; descriptionConfig:string}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserBasicsSchema>>({
    resolver: zodResolver(UserBasicsSchema),
    defaultValues: {
      description: descriptionConfig,
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
