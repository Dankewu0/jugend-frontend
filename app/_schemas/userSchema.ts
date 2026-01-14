import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(255),
  email: z.string().email(),
  avatar: z
    .any()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      { message: "Файл должен быть изображением" },
    )
    .optional(),
  threads: z.array(
    z.object({
      id: z.number(),
      title: z.string().min(1),
    }),
  ),
});

export type UserInput = z.infer<typeof UserSchema>;
