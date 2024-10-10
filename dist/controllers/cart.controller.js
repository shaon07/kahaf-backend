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
exports.userCarts = exports.deleteCart = exports.updateCart = exports.createCart = exports.getCart = exports.getAllCarts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const services_1 = require("../services");
const constants_1 = require("../constants");
exports.getAllCarts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT } = req.query;
    const carts = yield services_1.cartService.getAllCarts(Number(page), Number(take));
    res.status(200).json(new ApiResponse_1.default({
        data: carts,
        message: "Carts fetched successfully",
    }));
}));
exports.getCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cart = yield services_1.cartService.getCart(id);
    res.status(200).json(new ApiResponse_1.default({
        data: cart,
        message: "Cart fetched successfully",
    }));
}));
exports.createCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const cart = yield services_1.cartService.createCart(data);
    res.status(201).json(new ApiResponse_1.default({
        data: cart,
        message: "Cart created successfully",
    }));
}));
exports.updateCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const cart = yield services_1.cartService.updateCart(id, data);
    res.status(200).json(new ApiResponse_1.default({
        data: cart,
        message: "Cart updated successfully",
    }));
}));
exports.deleteCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cart = yield services_1.cartService.deleteCart(id);
    res.status(200).json(new ApiResponse_1.default({
        data: cart,
        message: "Cart deleted successfully",
    }));
}));
exports.userCarts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT } = req.query;
    const carts = yield services_1.cartService.userCart(id, Number(page), Number(take));
    res.status(200).json(new ApiResponse_1.default({
        data: carts,
        message: "Carts fetched successfully",
    }));
}));
