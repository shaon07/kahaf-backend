"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = exports.productsSchema = void 0;
const zod_1 = require("zod");
exports.productsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().max(255),
    price: zod_1.z.coerce.number(),
    categoryID: zod_1.z.string().max(255),
    description: zod_1.z.string().max(255),
    image: zod_1.z.string().max(255),
});
exports.createProductSchema = exports.productsSchema.omit({ id: true });
exports.updateProductSchema = exports.productsSchema.partial();
