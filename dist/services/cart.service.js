"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const cart_repo_1 = require("../repository/cart.repo");
const constants_1 = require("../constants");
const cartSchema_1 = require("../schema/cartSchema");
const zodErrorHandler_1 = require("../utils/zodErrorHandler");
const cartService = {
    getAllCarts: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT) {
        try {
            const carts = yield (0, cart_repo_1.findMany)(page, take);
            return carts;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    getCart: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield (0, cart_repo_1.findUnique)(id);
        if (!(cart === null || cart === void 0 ? void 0 : cart.id)) {
            throw new ApiError_1.default({
                message: "Cart not found",
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            });
        }
        return cart;
    }),
    createCart: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            cartSchema_1.cartSchema.parse(data);
            const cart = yield (0, cart_repo_1.create)(data);
            return cart;
        }
        catch (error) {
            (0, zodErrorHandler_1.zodErrorHandler)(error);
        }
    }),
    updateCart: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingCart = yield (0, cart_repo_1.findUnique)(id);
            if (!(existingCart === null || existingCart === void 0 ? void 0 : existingCart.id)) {
                throw Error("Cart not found");
            }
            cartSchema_1.updateCartSchema.parse(data);
            const cart = yield (0, cart_repo_1.update)(id, data);
            if (!(cart === null || cart === void 0 ? void 0 : cart.id)) {
                throw Error("Cart not updated");
            }
            return cart;
        }
        catch (error) {
            (0, zodErrorHandler_1.zodErrorHandler)(error);
        }
    }),
    deleteCart: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingCart = yield (0, cart_repo_1.findUnique)(id);
            if (!(existingCart === null || existingCart === void 0 ? void 0 : existingCart.id)) {
                throw Error("Cart not found");
            }
            const cart = yield (0, cart_repo_1.deleteUnique)(id);
            if (!(cart === null || cart === void 0 ? void 0 : cart.id)) {
                throw Error("Cart not deleted");
            }
            return cart;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    userCart: (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT) {
        try {
            const cart = yield (0, cart_repo_1.findOne)({ userID: id }, page, take);
            return cart;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
};
exports.default = cartService;
