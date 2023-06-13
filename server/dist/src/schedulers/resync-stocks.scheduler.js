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
const services_1 = require("../services");
const finnhub_service_1 = __importDefault(require("../services/finnhub.service"));
const resyncStocks = () => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = new Date().getTime();
    const stocks = yield DBClient_1.default.stock.findMany({
        select: {
            id: true,
        },
    });
    const stockIds = stocks.map(stock => stock.id);
    for (const stockId of stockIds) {
        try {
            const finnhubStockResponseDto = yield finnhub_service_1.default.fetchStock(stockId);
            yield services_1.stockService.updateStock(stockId, finnhubStockResponseDto);
        }
        catch (e) {
            console.error(e);
            console.log(`There was an error while updating stock: ${stockId}`);
        }
    }
    const endTime = new Date().getTime();
    console.log(`Stocks resync complete in ${endTime - startTime}ms`);
});
exports.default = resyncStocks;
