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
const getStocksPrice = (stocks) => {
    const stockPrice = {};
    stocks.forEach(stock => {
        stockPrice[stock.id] = stock.c;
    });
    return stockPrice;
};
const updateUserNetWorth = () => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = new Date().getTime();
    const stocks = yield DBClient_1.default.stock.findMany({
        select: {
            id: true,
            c: true,
        },
    });
    const stockPrice = getStocksPrice(stocks);
    const users = yield DBClient_1.default.user.findMany({
        select: {
            id: true,
        },
    });
    const userIds = users.map(user => user.id);
    // for (const userId of userIds) {
    //   try {
    //     await userService.updateNetWorth(userId, stockPrice);
    //   } catch (e) {
    //     console.error(e);
    //     console.log(`There was an error while updating user: ${userId}`);
    //   }
    // }
    const endTime = new Date().getTime();
    console.log(`Net worth update complete in ${endTime - startTime}ms`);
});
exports.default = updateUserNetWorth;
