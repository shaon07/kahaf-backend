import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
});

export const createCategorySchema = categorySchema.omit({ id: true });
