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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const services_1 = require("../services");
const constants_1 = require("../constants");
exports.getCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT, products = constants_1.DEFAULT_CATEGORY } = req.query;
    const categories = yield services_1.categoryService.getCategories({
        page: Number(page),
        take: Number(take),
        products: Number(products),
    });
    res.status(200).json(new ApiResponse_1.default({
        data: categories,
        message: "Categories fetched successfully",
    }));
}));
exports.getCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { products = constants_1.DEFAULT_CATEGORY } = req.query;
    const category = yield services_1.categoryService.getCategory(id, Number(products));
    res.status(200).json(new ApiResponse_1.default({
        data: category,
        message: "Category fetched successfully",
    }));
}));
exports.createCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const category = yield services_1.categoryService.createCategory({ name });
    res.status(200).json(new ApiResponse_1.default({
        data: category,
        message: "Category created successfully",
    }));
}));
exports.updateCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name } = req.body;
    if (!id) {
        throw new ApiError_1.default({ message: "Id is required", statusCode: 400 });
    }
    const category = yield services_1.categoryService.updateCategory(id, { name });
    res.status(200).json(new ApiResponse_1.default({
        data: category,
        message: "Category updated successfully",
    }));
}));
exports.deleteCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const category = yield services_1.categoryService.deleteCategory(id);
    res.status(202).json(new ApiResponse_1.default({
        statusCode: 202,
        data: category,
        message: "Category deleted successfully",
    }));
}));
