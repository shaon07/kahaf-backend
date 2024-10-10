"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodErrorHandler = void 0;
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("./ApiError"));
const http_status_codes_1 = require("http-status-codes");
const zodErrorHandler = (error, code = http_status_codes_1.StatusCodes.BAD_REQUEST) => {
    if (error instanceof zod_1.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
            message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        throw new ApiError_1.default({
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            errors: errorMessages,
            message: "Invalid data",
        });
    }
    else {
        throw new ApiError_1.default({
            statusCode: code,
            message: error.message,
        });
    }
};
exports.zodErrorHandler = zodErrorHandler;
