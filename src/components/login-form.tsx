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
import { Input } from "@/components/ui/input";
import { login } from "@/actions/login";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

import { LoginSchema } from "@/schemas";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const response = await login(data);
      if (response && response.error) {
        toast({
          title: "¡Error!",
          description: response.error,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input disabled={isPending} type="email" {...field} placeholder="nombre.apellido@yachaytech.edu.ec"/>
              </FormControl>
              <FormDescription>Ingresa tu correo institucional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="*******"
                  type="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ingresa tu contraseña de Tuto-U
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          Ingresa
        </Button>
      </form>
    </Form>
  );
}
