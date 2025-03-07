import * as z from "zod";
import { format } from "date-fns";

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
});

export const UserCoursesSchema = z.object({
  courses: z.array(z.coerce.number()),
});

export const UserAvailabilitySchema = z.object({
  mondayAvailability: z.array(z.string()),
  tuesdayAvailability: z.array(z.string()),
  wednesdayAvailability: z.array(z.string()),
  thursdayAvailability: z.array(z.string()),
  fridayAvailability: z.array(z.string()),
  saturdayAvailability: z.array(z.string()),
  sundayAvailability: z.array(z.string()),
});

export const IndividualSessionRequestSchema = z
  .object({
    date: z.date({
      required_error: "Tienes que escoger una fecha.",
    }),
    course: z.string({
      required_error: "Tienes que escoger un curso.",
    }),
    time: z
      .string({
        required_error: "Tienes que escoger una hora.",
      })
      .min(4, "Debes ingresar una hora válida"),
    tutor: z
      .string({
        required_error: "Tienes que escoger un tutor.",
      })
      .min(1, "Tienes que escoger un tutor."),
    duration: z.string({
      required_error: "Tienes que escoger una duración.",
    }).min(1, "Tienes que escoger una duración"),
    topic: z
      .string({
        required_error: "Tienes que ingresar un tema.",
      })
      .min(5, "Minimo 5 caracteres")
      .max(100, "Maximo 100 caracteres"),
    place: z.string().optional(),
    isOnline: z.boolean(),
  })
  .refine(
    (schema) => {
      if (format(new Date(), "dd/MM/y") !== format(schema.date, "dd/MM/y")) {
        return true;
      } else {
        if (
          parseInt(schema.time.split(":")[0], 10) <=
          new Date().getHours() + 8
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    {
      message: "Debes solicitar la tutoría con 8 horas de anticipación",
      path: ["time"],
    }
  );

export const RateSessionSchema = z.object({
  rate: z.number().min(0).max(5).multipleOf(0.5),
  comment: z.string().max(80, "El comentario no debe contener más de 80 caracteres").optional()
});

export const UserBasicsSchema = z.object({
  description: z
    .string()
    .max(160, "La descripción no debe contener más de 160 caracteres")
    .optional(),
  whatsapp: z
    .string()
    .refine((val) => val.startsWith("+"), {
      message: "El número debe comenzar con '+'.",
    })
    .refine((val) => /^\+\d+$/.test(val), {
      message:
        "El número solo debe contener dígitos después del '+', sin espacios ni guiones.",
    })
    .refine((val) => val.length >= 10 && val.length <= 16, {
      message: "El número debe tener entre 10 y 16 caracteres en total.",
    })
    .optional(),
});

export const SessionReportSchema = z.object({
  description: z.string().max(120, "La descripción no debe contener más de 120 caracteres")
})

export const ProfileSessionRequestSchema = z
  .object({
    date: z.date({
      required_error: "Tienes que escoger una fecha.",
    }),
    course: z.string({
      required_error: "Tienes que escoger un curso.",
    }),
    time: z
      .string({
        required_error: "Tienes que escoger una hora.",
      })
      .min(4, "Debes ingresar una hora válida"),
    duration: z
      .string({
        required_error: "Tienes que escoger una duración.",
      })
      .min(1, "Tienes que escoger una duración"),
    topic: z
      .string({
        required_error: "Tienes que ingresar un tema.",
      })
      .min(5, "Minimo 5 caracteres")
      .max(200, "Maximo 200 caracteres"),
    place: z.string().optional(),
    isOnline: z.boolean(),
  })
  .refine(
    (schema) => {
      if (format(new Date(), "dd/MM/y") !== format(schema.date, "dd/MM/y")) {
        return true;
      } else {
        if (
          parseInt(schema.time.split(":")[0], 10) <=
          new Date().getHours() + 8
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    {
      message: "Debes solicitar la tutoría con 8 horas de anticipación",
      path: ["time"],
    }
  );
