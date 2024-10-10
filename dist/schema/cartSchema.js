"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartSchema = exports.cartSchema = void 0;
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    productID: zod_1.z.string().uuid(),
});
exports.cartSchema = zod_1.z.object({
    userID: zod_1.z.string().uuid(),
    products: zod_1.z.array(productSchema),
});
exports.updateCartSchema = exports.cartSchema.omit({ userID: true });
