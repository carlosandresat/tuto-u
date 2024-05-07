import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string({
            required_error: "Por favor ingresa tu correo institucional.",
        })
        .email("Correo inválido, revisa la sintaxis.")
        .endsWith("@yachaytech.edu.ec", {
            message: "El correo debe terminar con @yachaytech.edu.ec",
        }),
    password: z.string().min(1, {
        message: "Debes ingresar tu contraseña",
    }),
});

export const RegisterSchema = z.object({
    name: z
        .string({
            required_error: "Por favor ingresa tus nombres",
        })
        .min(3, "Tu nombre debe incluir más de 3 caracteres")
        .max(24, "Tu nombre debe contener menos de 24 caracteres"),
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
            required_error: "Por favor ingresa una contraseña",
        })
        .min(8, "La contraseña debe contener mínimo 8 caracteres")
        .max(16, "La contraseña debe contener máximo 16 caracteres"),
});

export const UserPricingSchema = z.object({
    durations: z.array(z.string()),
    priceOneHour: z.coerce.number().multipleOf(0.01).optional(),
    priceOneHalfHour: z.coerce.number().multipleOf(0.01).optional(),
    priceTwoHours: z.coerce.number().multipleOf(0.01).optional(),
    priceTwoHalfHours: z.coerce.number().multipleOf(0.01).optional(),
    priceThreeHours: z.coerce.number().multipleOf(0.01).optional(),
})

export const UserCoursesSchema = z.object({
    courses: z.array(z.coerce.number())
})