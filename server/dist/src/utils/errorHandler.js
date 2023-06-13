"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const errorCodes = {
    P2002: "unique_constraint_error",
    P2007: "validation_error",
};
const errorHandler = (err, req, res, next) => {
    var _a;
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        Object.keys(errorCodes).includes(err.code)) {
        return res.json({
            code: errorCodes[err.code],
            payload: (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target,
        });
    }
    const errorMessage = err.message || "Something went wrong";
    if (err && err.status) {
        return res.status(err.status).json({
            message: errorMessage,
        });
    }
    return res.status(400).json({
        message: errorMessage,
    });
};
exports.errorHandler = errorHandler;
