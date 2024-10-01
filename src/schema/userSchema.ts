import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().min(6).max(255),
  username: z.string().max(255),
  password: z.string().min(8).max(255),
  phone: z.coerce.string().max(20),
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  street: z.string().max(255),
  city: z.string().max(255),
  state: z.string().max(255),
  zipCode: z.coerce.string().max(255),
  country: z.string().max(255),
  image: z.string().optional(),
  refreshToken: z.string().optional(),
  accessToken: z.string().optional(),
  role: z.enum(["ADMIN", "USER", "SUPERADMIN"]),
});

export const createUserSchema = userSchema.omit({ id: true });
export const updateUserSchema = userSchema.omit({ id: true }).partial();
export const loginUserSchema = userSchema.pick({ email: true, password: true });