import { z } from "zod";

const productSchema = z.object({
  quantity: z.number(),
  productID: z.string().uuid(),
});

export const cartSchema = z.object({
  userID: z.string().uuid(),
  products: z.array(productSchema),
});
