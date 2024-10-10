"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email().min(6).max(255),
    username: zod_1.z.string().max(255),
    password: zod_1.z.string().min(8).max(255),
    phone: zod_1.z.coerce.string().max(20),
    firstName: zod_1.z.string().max(255),
    lastName: zod_1.z.string().max(255),
    street: zod_1.z.string().max(255),
    city: zod_1.z.string().max(255),
    state: zod_1.z.string().max(255),
    zipCode: zod_1.z.coerce.string().max(255),
    country: zod_1.z.string().max(255),
    image: zod_1.z.string().optional(),
    refreshToken: zod_1.z.string().optional(),
    accessToken: zod_1.z.string().optional(),
    role: zod_1.z.enum(["ADMIN", "USER", "SUPERADMIN"]).default("USER"),
});
exports.createUserSchema = exports.userSchema.omit({ id: true });
exports.updateUserSchema = exports.userSchema.omit({ id: true }).partial();
exports.loginUserSchema = exports.userSchema.pick({ email: true, password: true });
