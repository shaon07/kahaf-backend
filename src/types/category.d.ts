import { z } from "zod";
import { createCategorySchema } from "../schema/categorySchema";

type createCategoryType = z.infer<typeof createCategorySchema>;