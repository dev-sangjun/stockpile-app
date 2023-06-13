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
const getStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.params;
    try {
        const stock = yield services_1.stockService.getStock(q.toUpperCase());
        return res.json(stock);
    }
    catch (e) {
        return next(e);
    }
});
const getStockSymbols = (req, res) => {
    const stockGetSymbolRequestDto = req.query;
    const stock = services_1.stockService.getStockSymbols(stockGetSymbolRequestDto);
    return res.json(stock);
};
const getAllStockSymbols = (req, res) => {
    const allStockSymbols = services_1.stockService.getAllStockSymbols();
    return res.json(allStockSymbols);
};
exports.default = {
    getStock,
    getStockSymbols,
    getAllStockSymbols,
};
