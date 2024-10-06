import { z } from "zod";
import { cartSchema } from "../schema/cartSchema";

export type cartType = z.infer<typeof cartSchema>;