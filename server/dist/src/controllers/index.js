"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.stockController = exports.portfolioController = exports.investmentController = exports.authController = void 0;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.authController = auth_controller_1.default;
const investment_controller_1 = __importDefault(require("./investment.controller"));
exports.investmentController = investment_controller_1.default;
const portfolio_controller_1 = __importDefault(require("./portfolio.controller"));
exports.portfolioController = portfolio_controller_1.default;
const stock_controller_1 = __importDefault(require("./stock.controller"));
exports.stockController = stock_controller_1.default;
const user_controller_1 = __importDefault(require("./user.controller"));
exports.userController = user_controller_1.default;
