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

import { UserCoursesSchema } from "@/schemas";
import { updateUserPricing } from "@/actions/user-configuration";

export function ProfileCoursesForm({
  userId,
  coursesConfig,
}: {
  userId: string | undefined;
  coursesConfig: { id: number; course: string }[];
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserCoursesSchema>>({
    resolver: zodResolver(UserCoursesSchema),
    defaultValues: {
      courses: [],
    },
  });

  function onSubmit(data: z.infer<typeof UserCoursesSchema>) {
    startTransition(async () => {
      //updateUserPricing(data, userId);
      toast({
        title: "¡Se han actualizado los precios de tus tutorías!",
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
        <FormField
          control={form.control}
          name="courses"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={field.value.map((x) => x.toString())}
                  onValueChange={field.onChange}
                >
                  {coursesConfig.map((row) => {
                    return(
                    <ToggleGroupItem
                      value={`${row.id}`}
                      key={`${row.id}`}
                      aria-label={`Toggle ${row.course}`}
                    >
                      {row.course}
                    </ToggleGroupItem>
                    )
                  })}
                  
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
