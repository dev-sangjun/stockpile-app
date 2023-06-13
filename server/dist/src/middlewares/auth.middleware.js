"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
    console.log(req);
    if (!token)
        return res.sendStatus(401); // not authorized
    try {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        req.authorizedUserId = payload.userId;
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(401);
    }
};
exports.authMiddleware = authMiddleware;
