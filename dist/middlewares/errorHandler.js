"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorHandler = ((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.statusCode || 500).json(Object.assign(Object.assign({}, err), { message: err.message, success: err.success, errors: err.errors }));
});
