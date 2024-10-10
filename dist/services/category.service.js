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
const category_repo_1 = require("../repository/category.repo");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const categoryService = {
    getCategories: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ page, take, products } = {}) {
        try {
            const categories = yield (0, category_repo_1.findMany)({ page, take, products });
            return categories;
        }
        catch (error) {
            throw new ApiError_1.default({
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: error.message,
            });
        }
    }),
    getCategory: (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, products = 0) {
        try {
            const category = yield (0, category_repo_1.findUnique)(id, products);
            if (!category) {
                throw new ApiError_1.default({
                    message: "Category not found",
                    statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                });
            }
            return category;
        }
        catch (error) {
            throw new ApiError_1.default({
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: error.message,
            });
        }
    }),
    createCategory: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isCategoryExist = yield (0, category_repo_1.findByName)(data.name);
            if (isCategoryExist) {
                throw new ApiError_1.default({
                    message: "Category already exist",
                    statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                });
            }
            const category = yield (0, category_repo_1.create)(data);
            if (!category) {
                throw new ApiError_1.default({
                    message: "Category not created",
                    statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                });
            }
            return category;
        }
        catch (error) {
            throw new ApiError_1.default({
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: error.message,
            });
        }
    }),
    updateCategory: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield (0, category_repo_1.update)(id, data);
            if (!(category === null || category === void 0 ? void 0 : category.name)) {
                throw new ApiError_1.default({
                    message: "Category not updated",
                    statusCode: 400,
                });
            }
            return category;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    deleteCategory: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!id) {
                throw new ApiError_1.default({
                    message: "Id is required",
                    statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                });
            }
            const category = yield (0, category_repo_1.deleteUnique)(id);
            if (!category) {
                throw new ApiError_1.default({
                    message: "Category not deleted",
                    statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                });
            }
            return category;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
};
exports.default = categoryService;
