import { z } from "zod";
import { cartSchema, updateCartSchema } from "../schema/cartSchema";

export type cartType = z.infer<typeof cartSchema>;

export type updateCartType = z.infer<typeof updateCartSchema>;