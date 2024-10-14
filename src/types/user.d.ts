import { z } from "zod";
import { loginSchema, registerSchema, socialLinkSchema, updateUserType, userSchema } from "../schema/user.schema";

export type SocialLinkType = z.infer<typeof socialLinkSchema>;
export type UserType = z.infer<typeof userSchema>;
export type UpdateUserType = z.infer<typeof updateUserType>
export type LoginType = z.infer<typeof loginSchema>
export type RegisterType = z.infer<typeof registerSchema>