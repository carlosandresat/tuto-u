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
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

import { LoginSchema } from "@/schemas";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const response = await login(data);
      // Chequear esta clave PRIMERO: antes ninguna función revisaba nada más
      // que response.error, así que un login() que devolviera
      // { verificationRequired: true } se veía como un login exitoso que no
      // llevaba a ninguna parte.
      if (response && response.verificationRequired) {
        toast({
          title: "Verifica tu correo",
          description: response.success,
        });
        router.push("/auth/verify-email");
        return;
      }
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
                <Input
                  disabled={isPending}
                  type="email"
                  {...field}
                  placeholder="nombre.apellido@yachaytech.edu.ec"
                />
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
              <FormDescription>Ingresa tu contraseña de Tuto-U</FormDescription>
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
