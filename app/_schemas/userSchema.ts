import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  avatar: z
    .any()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      { message: "Файл должен быть изображением" },
    )
    .optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
