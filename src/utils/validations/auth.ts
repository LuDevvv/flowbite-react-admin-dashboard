import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede exceder los 50 caracteres" })
    .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/, {
      message:
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.",
    }),
});

export const signupSchema = z.object({
  fullName: z.string().min(1, { message: "El nombre completo es obligatorio" }),
  companyName: z
    .string()
    .min(1, { message: "El nombre de la empresa es obligatorio" }),
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede exceder los 50 caracteres" })
    .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/, {
      message:
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.",
    }),
});
