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
const getInvestmentsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const investments = yield DBClient_1.default.investment.findMany({
        where: {
            userId,
        },
    });
    return investments;
});
const getInvestmentsByPortfolioId = (portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    const investments = yield DBClient_1.default.investment.findMany({
        where: {
            portfolioId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return investments;
});
const updateInvestment = (investmentId, updateInvestmentDto) => __awaiter(void 0, void 0, void 0, function* () {
    // remove fields with null values in updateInvestmentDto
    // null values indicate that there is no update needed for that field
    if (!updateInvestmentDto.quantity) {
        delete updateInvestmentDto.quantity;
    }
    if (!updateInvestmentDto.avgCost) {
        delete updateInvestmentDto.avgCost;
    }
    const investment = yield DBClient_1.default.investment.update({
        data: Object.assign({}, updateInvestmentDto),
        where: {
            id: investmentId,
        },
    });
    if (!investment) {
        throw new errors_global_1.InternalServerError();
    }
    return {
        success: true,
    };
});
exports.default = {
    getInvestmentsByUserId,
    getInvestmentsByPortfolioId,
    updateInvestment,
};
