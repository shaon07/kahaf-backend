import { z } from "zod";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  userSchema,
} from "../schema/userSchema";

export type createUserType = z.infer<typeof createUserSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;
export type loginUserType = z.infer<typeof loginUserSchema>;