"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

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

export const preregister = async (data: z.infer<typeof FormSchema>) => {
  const validatedFields = FormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const {
    firstname,
    lastname,
    password,
    email,
    role,
    semester,
    school,
    gender,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email ya registrado" };
  }

  const result = await db.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  await db.userAchievement.create({
    data: {
      userId: result.id,
      achievementId: 1,
    },
  });

  await db.preregister.create({
    data: {
      role,
      school,
      semester,
      gender,
    },
  });
  redirect("/");
};
