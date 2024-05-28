"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { UserCoursesSchema } from "@/schemas";
import { updateUserCourses } from "@/actions/user-configuration";

export function ProfileCoursesForm({
  userId,
  courses,
  coursesConfig,
}: {
  userId: string;
  courses: { id: number; course: string }[];
  coursesConfig: number[]
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserCoursesSchema>>({
    resolver: zodResolver(UserCoursesSchema),
    defaultValues: {
      courses: coursesConfig,
    },
  });

  function onSubmit(data: z.infer<typeof UserCoursesSchema>) {
    startTransition(async () => {
      updateUserCourses(data, userId);
      toast({
        title: "¡Se han actualizado tus asignaturas!",
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
                  {courses.map((row) => {
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
