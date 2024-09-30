import { z } from "zod";
import {
  createUserSchema,
  updateUserSchema,
  userSchema,
} from "../schema/userSchema";

export type createUserType = z.infer<typeof createUserSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;
