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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../services");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const constants_1 = require("../constants");
exports.getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category = constants_1.DEFAULT_CATEGORY, page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT, } = req.query;
    if (Number(category || 0) < 0 || Number(category || 0) > 1) {
        throw new ApiError_1.default({
            message: "Invalid category params",
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        });
    }
    const productList = yield services_1.productService.getProducts({
        category: Number(category),
        page: Number(page),
        take: Number(take),
    });
    res.status(200).json(new ApiResponse_1.default({
        statusCode: 200,
        data: productList,
        message: "Products fetched successfully",
    }));
}));
exports.getProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { category } = req.query;
    const product = yield services_1.productService.getProduct(id, Number(category));
    res.status(200).json(new ApiResponse_1.default({
        data: product,
        message: "Product fetched successfully",
    }));
}));
exports.createProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    payload.image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const product = yield services_1.productService.createProduct(payload);
    res.status(201).json(new ApiResponse_1.default({
        data: product,
        message: "Product created successfully",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
    }));
}));
exports.updateProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const category = req.query.category;
    const payload = req.body;
    payload.image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const product = yield services_1.productService.updateProduct(id, payload, Number(category));
    res.status(200).json(new ApiResponse_1.default({
        data: product,
        message: "Product updated successfully",
    }));
}));
exports.deleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield services_1.productService.deleteProduct(id);
    res.status(200).json(new ApiResponse_1.default({
        data: product,
        message: "Product deleted successfully",
    }));
}));
