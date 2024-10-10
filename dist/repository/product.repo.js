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
exports.deleteUnique = exports.update = exports.findUnique = exports.findMany = exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../prisma");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.prisma.product
            .create({
            data: data,
        })
            .catch((err) => {
            throw new ApiError_1.default({
                message: err.meta.cause,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        });
        return product;
    }
    catch (error) {
        throw new ApiError_1.default({
            message: error.message,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        });
    }
});
exports.create = create;
const findMany = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ category = 0, page = 1, take = 10, } = {}) {
    try {
        const products = yield prisma_1.prisma.product.paginate({
            page,
            limit: take,
            include: {
                category: category ? true : false,
            },
        });
        return products;
    }
    catch (error) {
        throw new ApiError_1.default({
            message: error.message,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        });
    }
});
exports.findMany = findMany;
const findUnique = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, category = 0) {
    try {
        const product = yield prisma_1.prisma.product.findUnique({
            where: { id },
            include: {
                category: category ? true : false,
            },
        });
        return product;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.findUnique = findUnique;
const update = (id_1, data_1, ...args_1) => __awaiter(void 0, [id_1, data_1, ...args_1], void 0, function* (id, data, category = 0) {
    try {
        const product = yield prisma_1.prisma.product
            .update({
            where: { id },
            data: data,
            include: {
                category: category ? true : false,
            },
        })
            .catch((err) => {
            throw Error(err.message);
        });
        return product;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.update = update;
const deleteUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.prisma.product.delete({
            where: { id },
        });
        return product;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.deleteUnique = deleteUnique;
