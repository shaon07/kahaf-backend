import {z} from "zod";

export const productsSchema = z.object({
    id: z.string().uuid(),
    title: z.string().max(255),
    price: z.coerce.number(),
    categoryID: z.string().max(255),
    description: z.string().max(255),
    image: z.string().max(255),
});

export const createProductSchema = productsSchema.omit({ id: true })
export const updateProductSchema = productsSchema.partial();