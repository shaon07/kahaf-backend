"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor({ message, statusCode, errors }) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = 'fail';
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ApiError;
