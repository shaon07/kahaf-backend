import { z } from "zod";

// SocialLink Schema
export const socialLinkSchema = z.object({
  id: z.string().optional(), // MongoDB ObjectId (optional for creation)
  platform: z.string().min(1, { message: "Platform is required" }),
  url: z.string().url({ message: "Invalid URL" }),
  userId: z.string().optional(), // MongoDB ObjectId reference to User (optional)
});

// User Schema
export const userSchema = z.object({
  id: z.string().optional(), // MongoDB ObjectId (optional for creation)
  username: z.string().min(1, { message: "Username is required" }),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  picture: z.string().url().optional(),
  refreshToken: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const updateUserType = userSchema.partial();
export const loginSchema = userSchema.pick({ email: true, password: true });
export const registerSchema = userSchema.pick({
  email: true,
  password: true,
  firstname: true,
  lastname: true,
  username: true,
});
