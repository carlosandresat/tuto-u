"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MentorAdminEmailSchema } from "@/schemas";
import { grantMentorAdmin, revokeMentorAdmin } from "@/actions/roles";
import type { MentorAdminRow } from "@/data/admin-roles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function MentorAdminRoles({ admins }: { admins: MentorAdminRow[] }) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof MentorAdminEmailSchema>>({
    resolver: zodResolver(MentorAdminEmailSchema),
    defaultValues: { email: "" },
  });

  const run = (action: () => Promise<{ error?: string; success?: string }>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const response = await action();
      setError(response.error);
      setSuccess(response.success);
      if (response.success) form.reset();
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Admins de mentores</CardTitle>
        <CardDescription>
          Pueden crear periodos académicos y gestionar la lista de mentores en
          /mentors. No tienen acceso a este panel.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {admins.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Todavía no hay admins de mentores.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {admins.map((admin) => (
              <li
                key={admin.id}
                className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium">{admin.name || "Sin nombre"}</p>
                  <p className="truncate text-sm text-muted-foreground">{admin.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => run(() => revokeMentorAdmin(admin.id))}
                >
                  Quitar rol
                </Button>
              </li>
            ))}
          </ul>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => run(() => grantMentorAdmin(values)))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otorgar rol a</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="nombre.apellido@yachaytech.edu.ec"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit">
              Otorgar rol
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
