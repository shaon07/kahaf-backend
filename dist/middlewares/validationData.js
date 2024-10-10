"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const http_status_codes_1 = require("http-status-codes");
const zodErrorHandler_1 = require("../utils/zodErrorHandler");
function validateData(schema, type = 0) {
    return (req, res, next) => {
        try {
            type === 0 ? schema.parse(req.body) : schema.safeParse(req.body);
            next();
        }
        catch (error) {
            (0, zodErrorHandler_1.zodErrorHandler)(error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    };
}
