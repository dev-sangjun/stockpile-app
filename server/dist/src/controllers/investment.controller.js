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
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const errors_global_1 = require("../global/errors.global");
const getInvestments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, portfolioId } = req.query;
    try {
        if (userId) {
            const investments = yield services_1.investmentService.getInvestmentsByUserId(userId);
            return res.json(investments);
        }
        if (portfolioId) {
            const investments = yield services_1.investmentService.getInvestmentsByPortfolioId(portfolioId);
            return res.json(investments);
        }
        throw new errors_global_1.BadRequestError();
    }
    catch (e) {
        return next(e);
    }
});
const updateInvestment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { investmentId } = req.params;
    try {
        const result = yield services_1.investmentService.updateInvestment(investmentId, req.body);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});
exports.default = {
    getInvestments,
    updateInvestment,
};
