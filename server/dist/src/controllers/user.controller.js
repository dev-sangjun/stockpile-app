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
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorizedUserId } = req;
        const user = yield services_1.userService.getPublicUser(authorizedUserId);
        return res.json(user);
    }
    catch (e) {
        return next(e);
    }
});
const getStocks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorizedUserId } = req;
        const stocks = yield services_1.userService.getStocks(authorizedUserId);
        return res.json(stocks);
    }
    catch (e) {
        return next(e);
    }
});
const getInvestments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    try {
        const investments = yield services_1.investmentService.getInvestmentsByUserId(authorizedUserId);
        return res.json(investments);
    }
    catch (e) {
        return next(e);
    }
});
const addToFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    const { stockId } = req.body;
    try {
        if (stockId) {
            const result = yield services_1.userService.addToFavoriteStocks(authorizedUserId, stockId);
            return res.json(result);
        }
        throw new errors_global_1.BadRequestError();
    }
    catch (e) {
        return next(e);
    }
});
const deleteFromFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    const { stockId } = req.query;
    try {
        if (stockId) {
            const result = yield services_1.userService.deleteFromFavoriteStocks(authorizedUserId, stockId);
            return res.json(result);
        }
        throw new errors_global_1.BadRequestError();
    }
    catch (e) {
        return next(e);
    }
});
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    const { field } = req.query;
    const { password } = req.body;
    const goalAmount = req.body["goal-amount"];
    try {
        if (field === "password" && password) {
            const result = yield services_1.userService.updatePassword(authorizedUserId, password);
            return res.json(result);
        }
        if (field === "goal-amount" && goalAmount) {
            const result = yield services_1.userService.updateGoalAmount(authorizedUserId, goalAmount);
            return res.json(result);
        }
        throw new errors_global_1.BadRequestError();
    }
    catch (e) {
        return next(e);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorizedUserId } = req;
    try {
        const result = yield services_1.userService.deleteUser(authorizedUserId);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});
exports.default = {
    getUser,
    getStocks,
    getInvestments,
    addToFavorites,
    deleteFromFavorites,
    updatePassword,
    deleteUser,
};
