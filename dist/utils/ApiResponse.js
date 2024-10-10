"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor({ statusCode, data, message, status = 'success' }) {
        this.statusCode = statusCode || 200;
        this.status = status;
        this.message = message || '';
        this.data = data || {};
    }
}
exports.default = ApiResponse;
