import { z } from "zod";

export const ForumThreadSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  category_id: z.number(),
  title: z
    .string()
    .min(3)
    .max(255, { message: "Объем заголовка слишком большой" }),
  body: z.string().min(4).max(255, { message: "Объем текста слишком большой" }),
  slug: z.string().max(20),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const ForumThreadArraySchema = z.array(ForumThreadSchema);

export const CreateForumThreadSchema = ForumThreadSchema.pick({
  title: true,
  body: true,
  category_id: true,
});

export const UpdateForumThreadSchema = ForumThreadSchema.partial().pick({
  title: true,
  body: true,
  category_id: true,
});
