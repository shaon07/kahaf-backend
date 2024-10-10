"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = exports.userService = exports.productService = exports.categoryService = void 0;
const category_service_1 = __importDefault(require("./category.service"));
exports.categoryService = category_service_1.default;
const product_service_1 = __importDefault(require("./product.service"));
exports.productService = product_service_1.default;
const user_service_1 = __importDefault(require("./user.service"));
exports.userService = user_service_1.default;
const cart_service_1 = __importDefault(require("./cart.service"));
exports.cartService = cart_service_1.default;
