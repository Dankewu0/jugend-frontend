import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Логин должен содержать 3 и более символов" })
    .max(255, { message: "Никнейм слишком длинный" }),
  email: z
    .string()
    .email({ message: "Неверный формат email" })
    .max(255, { message: "Email слишком длинный" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать 6 и более символов" })
    .max(255, { message: "Пароль слишком длинный" }),
});

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, { message: "Никнейм/email должен содержать 3 и более символов" })
    .max(255, { message: "Слишком длинное имя или email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать 6 и более символов" })
    .max(255, { message: "Слишком длинный пароль" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
