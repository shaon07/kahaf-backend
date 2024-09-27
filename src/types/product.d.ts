import { z } from "zod";
import { createProductSchema,updateProductSchema } from "../schema/productSchema";

export type createProductType = z.infer<typeof createProductSchema>
export type updateProductType = z.infer<typeof updateProductSchema>