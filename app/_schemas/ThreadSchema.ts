import { z } from "zod";

export const ThreadSchema = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  category_id: z.number(),
  title: z.string().min(3).max(255),
  slug: z.string().optional(),
  body: z.string().min(1),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const CreateThreadSchema = ThreadSchema.pick({
  title: true,
  body: true,
  category_id: true,
});

export const UpdateThreadSchema = ThreadSchema.partial().pick({
  title: true,
  body: true,
  category_id: true,
});
