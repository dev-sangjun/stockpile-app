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
const DBClient_1 = __importDefault(require("../../prisma/DBClient"));
const errors_global_1 = require("../global/errors.global");
const stock_service_1 = __importDefault(require("./stock.service"));
const user_service_1 = __importDefault(require("./user.service"));
const getAvgCost = (prevInvestment, newCost, newQuantity) => {
    const prevInvestmentTotalPrice = prevInvestment.avgCost * prevInvestment.quantity;
    const newInvestmentTotalPrice = newCost * newQuantity;
    const totalQuantity = prevInvestment.quantity + newQuantity;
    return (prevInvestmentTotalPrice + newInvestmentTotalPrice) / totalQuantity;
};
const getPortfoliosByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolios = yield DBClient_1.default.portfolio.findMany({
        where: {
            userId,
        },
        include: {
            investments: true,
        },
    });
    return portfolios;
});
const createPortfolio = (userId, portfolioName) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield DBClient_1.default.portfolio.findFirst({
        where: {
            userId,
            name: portfolioName,
        },
    });
    if (portfolio) {
        throw new errors_global_1.DuplicateEntityError();
    }
    const newPortfolio = yield DBClient_1.default.portfolio.create({
        data: {
            userId,
            name: portfolioName,
        },
    });
    return newPortfolio;
});
const addInvestmentToPortfolio = (userId, portfolioId, addInvestmentToPortfolioDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, cost, stockId } = addInvestmentToPortfolioDto;
    // invoke getStock to check if the stockId is valid
    const stock = yield stock_service_1.default.getStock(stockId);
    // set cost to current price if nullish cost was passed
    const adjustedCost = cost !== null && cost !== void 0 ? cost : stock.c;
    yield user_service_1.default.addStock(userId, stock);
    // find investment
    const investment = yield DBClient_1.default.investment.findFirst({
        where: {
            userId,
            portfolioId,
            stockId: stockId.toUpperCase(),
        },
    });
    if (!investment) {
        const newInvestment = yield DBClient_1.default.investment.create({
            data: {
                quantity,
                avgCost: adjustedCost,
                userId,
                portfolioId,
                stockId: stockId.toUpperCase(),
            },
        });
        return newInvestment;
    }
    const updatedInvestment = yield DBClient_1.default.investment.update({
        data: {
            quantity: investment.quantity + quantity,
            avgCost: getAvgCost(investment, adjustedCost, quantity),
        },
        where: {
            id: investment.id,
        },
    });
    return updatedInvestment;
});
const deleteInvestment = (investmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const investment = yield DBClient_1.default.investment.delete({
        where: {
            id: investmentId,
        },
    });
    if (!investment) {
        throw new errors_global_1.InternalServerError();
    }
    yield user_service_1.default.deleteStockWithNoReferenceFromUser(investment.userId, investment.stockId);
    return {
        success: true,
    };
});
const deletePortfolio = (portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield DBClient_1.default.portfolio.delete({
        where: {
            id: portfolioId,
        },
    });
    if (!portfolio) {
        throw new errors_global_1.InternalServerError();
    }
    return {
        success: true,
    };
});
const updatePortfolio = (portfolioId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield DBClient_1.default.portfolio.update({
        data: {
            name,
        },
        where: {
            id: portfolioId,
        },
    });
    if (!portfolio) {
        throw new errors_global_1.InternalServerError();
    }
    return {
        success: true,
    };
});
exports.default = {
    getPortfoliosByUserId,
    createPortfolio,
    addInvestmentToPortfolio,
    deleteInvestment,
    deletePortfolio,
    updatePortfolio,
};
