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
const getPortfolios = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    try {
        const portfolios = yield services_1.portfolioService.getPortfoliosByUserId(authorizedUserId);
        return res.json(portfolios);
    }
    catch (e) {
        return next(e);
    }
});
const createPortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    const { name } = req.body;
    try {
        const portfolio = yield services_1.portfolioService.createPortfolio(authorizedUserId, name);
        return res.json(portfolio);
    }
    catch (e) {
        return next(e);
    }
});
const addInvestmentToPortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    const { portfolioId } = req.params;
    const addInvestmentToPortfolioDto = req.body;
    try {
        const portfolio = yield services_1.portfolioService.addInvestmentToPortfolio(authorizedUserId, portfolioId, addInvestmentToPortfolioDto);
        return res.json(portfolio);
    }
    catch (e) {
        return next(e);
    }
});
const deleteInvestment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { investmentId } = req.params;
    try {
        const investment = yield services_1.portfolioService.deleteInvestment(investmentId);
        return res.json(investment);
    }
    catch (e) {
        return next(e);
    }
});
const deletePortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { portfolioId } = req.params;
    try {
        const result = yield services_1.portfolioService.deletePortfolio(portfolioId);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});
const updatePortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { portfolioId } = req.params;
    const { name } = req.body;
    try {
        const result = yield services_1.portfolioService.updatePortfolio(portfolioId, name);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});
exports.default = {
    getPortfolios,
    createPortfolio,
    addInvestmentToPortfolio,
    deleteInvestment,
    deletePortfolio,
    updatePortfolio,
};
