"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { preregister } from "@/actions/preregister";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  firstname: z
    .string({
      required_error: "Por favor ingresa tus nombres",
    })
    .min(3, "Tu nombre debe incluir más de 3 caracteres")
    .max(24, "Tu nombre debe contener menos de 24 caracteres"),
  lastname: z
    .string({
      required_error: "Por favor ingresa tus apellidos",
    })
    .min(3, "Tu apellido debe incluir más de 3 caracteres")
    .max(24, "Tu apellido debe contener menos de 24 caracteres"),
  email: z
    .string({
      required_error: "Por favor ingresa tu correo institucional.",
    })
    .email("Correo inválido, revisa la sintaxis.")
    .endsWith("@yachaytech.edu.ec", {
      message: "El correo debe terminar con @yachaytech.edu.ec",
    }),
  password: z
    .string({
      required_error: "Por favor ingresa una contrseña",
    })
    .min(8, "La contraseña debe contener mínimo 8 caracteres")
    .max(16, "La contraseña debe contener máximo 16 caracteres"),
  gender: z.string().optional(),
  role: z.string().optional(),
  semester: z.string().optional(),
  school: z.string().optional(),
});

export function PreregisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const response = await preregister(data);
      if (!response.error) {
        toast({
          title: "¡Pre-Registro completo!",
          description:
            "Gracias por tu pre-registro. Síguenos en nuestras redes sociales para mantenerte al tanto de Tuto-U.",
        });
      } else {
        toast({
          title: "¡Error en Pre-Registro!",
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
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pb-2">
            Encuesta
          </h4>
          <p className="text-sm text-muted-foreground">
            Sección opcional. Ayúdanos a recopilar infomación importante con los
            siguientes datos.
          </p>
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl className=" w-32">
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m">Masculino</SelectItem>
                  <SelectItem value="f">Femenino</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Selecciona tu género.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol interesado</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Solo estudiante</SelectItem>
                  <SelectItem value="tutor">Solo tutor</SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona el rol que te interesa dentro de la plataforma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Escuela</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="agro">
                    Escuela de Ciencias Agropecuarias y Agroindustriales
                  </SelectItem>
                  <SelectItem value="bio">
                    Escuela de Ciencias Biológicas e Ingeniería
                  </SelectItem>
                  <SelectItem value="fis">
                    Escuela de Ciencias Físicas y Nanotecnología
                  </SelectItem>
                  <SelectItem value="geo">
                    Escuela de Ciencias de la Tierra, Energía y Ambiente
                  </SelectItem>
                  <SelectItem value="mate">
                    Escuela de Ciencias Matemáticas y Computacionales
                  </SelectItem>
                  <SelectItem value="quim">
                    Escuela de Ciencias Químicas e Ingeniería
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona la escuela que perteneces actualmente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semestre</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl className=" w-32">
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pre">Nivelación</SelectItem>
                  <SelectItem value="1">1ro</SelectItem>
                  <SelectItem value="2">2do</SelectItem>
                  <SelectItem value="3">3ro</SelectItem>
                  <SelectItem value="4">4to</SelectItem>
                  <SelectItem value="5">5to</SelectItem>
                  <SelectItem value="6">6to</SelectItem>
                  <SelectItem value="7">7mo</SelectItem>
                  <SelectItem value="8">8vo</SelectItem>
                  <SelectItem value="9">9no</SelectItem>
                  <SelectItem value="10">10mo</SelectItem>
                  <SelectItem value="graduated">Graduado</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona el semestre que estás cursando.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          Pre-Registrar
        </Button>
      </form>
    </Form>
  );
}
