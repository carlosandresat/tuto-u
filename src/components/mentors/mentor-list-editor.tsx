"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MentorEmailsSchema } from "@/schemas";
import { addMentors, deleteAcademicPeriod, removeMentor } from "@/actions/mentors";
import type { AcademicPeriodRow, MentorAssignmentRow } from "@/data/mentors";
import { Badge } from "@/components/ui/badge";
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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

type ActionResponse = { error?: string; success?: string };

export function MentorListEditor({
  period,
  mentors,
}: {
  period: AcademicPeriodRow;
  mentors: MentorAssignmentRow[];
}) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const readOnly = period.status === "past";

  const form = useForm<z.infer<typeof MentorEmailsSchema>>({
    resolver: zodResolver(MentorEmailsSchema),
    defaultValues: { periodId: period.id, emails: "" },
  });

  const run = (action: () => Promise<ActionResponse>, resetForm = false) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const response = await action();
      setError(response.error);
      setSuccess(response.success);
      if (response.success && resetForm) form.reset({ periodId: period.id, emails: "" });
    });
  };

  return (
    <div className="space-y-6">
      {readOnly && (
        <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          Este periodo ya terminó: su lista de mentores es solo de lectura.
        </p>
      )}

      {mentors.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Este periodo todavía no tiene mentores.
        </p>
      ) : (
        <ul className="divide-y rounded-md border">
          {mentors.map((mentor) => (
            <li
              key={mentor.id}
              className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                {mentor.username ? (
                  <Link
                    href={`/${mentor.username}/profile`}
                    className="font-medium hover:underline"
                  >
                    {mentor.name || mentor.username}
                  </Link>
                ) : (
                  <Badge variant="outline">Sin cuenta aún</Badge>
                )}
                <p className="truncate text-sm text-muted-foreground">{mentor.email}</p>
              </div>
              {!readOnly && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => run(() => removeMentor(mentor.id))}
                >
                  Quitar
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!readOnly && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => run(() => addMentors(values), true))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agregar mentores</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      rows={4}
                      placeholder={"ana.perez@yachaytech.edu.ec\nluis.mora@yachaytech.edu.ec"}
                    />
                  </FormControl>
                  <FormDescription>
                    Pega uno o varios correos institucionales, separados por
                    comas o saltos de línea. No hace falta que ya tengan cuenta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              Agregar a {period.label}
            </Button>
          </form>
        </Form>
      )}

      <FormError message={error} />
      <FormSuccess message={success} />

      {period.status === "future" && mentors.length === 0 && (
        <Button
          variant="destructive"
          size="sm"
          disabled={isPending}
          onClick={() => run(() => deleteAcademicPeriod(period.id))}
        >
          Eliminar periodo {period.label}
        </Button>
      )}
    </div>
  );
}
