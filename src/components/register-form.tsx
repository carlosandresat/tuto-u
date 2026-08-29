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
import { register } from "@/actions/login";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

import { RegisterSchema } from "@/schemas";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      const response = await register(data);

      if (response && response.error) {
        toast({
          title: "¡Error!",
          description: response.error,
        });
      } else {
        // El destino del CTA depende de si la cuenta todavía necesita
        // verificarse: antes siempre apuntaba a /auth/login, que ahora sería
        // un callejón sin salida para una cuenta recién creada.
        const verifyDestination = response?.verificationRequired
          ? "/auth/verify-email"
          : "/auth/login";
        toast({
          title: "¡Felicidades!",
          description: response?.message,
          action: (
            <ToastAction altText="Verificar">
              <Link href={verifyDestination}>
                {response?.verificationRequired ? "Verificar" : "Login"}
              </Link>
            </ToastAction>
          ),
        });
        if (response?.verificationRequired) {
          router.push("/auth/verify-email");
        }
      }
      form.reset({ firstname: "", lastname: "", email: "", password: "" });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Ingresa tus nombres.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Ingresa tus apellidos.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Institucional</FormLabel>
              <FormControl>
                <Input
                  placeholder="nombre.apellido@yachaytech.edu.ec"
                  type="email"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ingresa tu correo institucional.
              </FormDescription>
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
                  placeholder="Min. 8 caracteres"
                  type="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ingresa una contraseña para ingresar a Tuto-U.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          Regístrate
        </Button>
      </form>
    </Form>
  );
}
