"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const investment_routes_1 = __importDefault(require("./investment.routes"));
const portfolio_routes_1 = __importDefault(require("./portfolio.routes"));
const stock_routes_1 = __importDefault(require("./stock.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rootRouter = (0, express_1.Router)();
rootRouter.use("/auth", auth_routes_1.default);
rootRouter.use("/investments", auth_middleware_1.authMiddleware, investment_routes_1.default);
rootRouter.use("/portfolios", auth_middleware_1.authMiddleware, portfolio_routes_1.default);
rootRouter.use("/stocks", auth_middleware_1.authMiddleware, stock_routes_1.default);
rootRouter.use("/me", auth_middleware_1.authMiddleware, user_routes_1.default);
exports.default = rootRouter;
