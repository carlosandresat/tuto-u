"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

const FormSchema = z.object({
    name: z
        .string({
            required_error: "Por favor ingresa tu nombre completo",
        })
        .min(10, "Tu nombre debe incluir más de 10 caracteres")
        .max(40, "Tu nombre debe contener menos de 40 caracteres"),
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
    role: z.string().optional(),
    semester: z.string().optional(),
    school: z.string().optional(),
});

export const preregister = async (data: z.infer<typeof FormSchema>) => {
    const validatedFields = FormSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    const { name, password, email, role, semester, school } =
        validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    })

    if (existingUser) {
        return { error: "Email ya registrado"}
    }

    await db.user.create({
        data: {
            name, 
            email, 
            password: hashedPassword,
        }
    })

    await db.preregister.create({
        data: {
            role,
            school,
            semester,
        }
    })

    return { sucess: "Pre-Registro completado" };
};
