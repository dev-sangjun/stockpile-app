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
const finnhub_service_1 = __importDefault(require("./finnhub.service"));
const all_stock_symbols_json_1 = __importDefault(require("../data/all_stock_symbols.json"));
const createStock = (q, finnhubStockResponseDto, finnhubCompanyResponseDto) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = yield DBClient_1.default.stock.create({
        data: Object.assign(Object.assign({ id: q.toUpperCase() }, finnhubStockResponseDto), { company: {
                create: Object.assign({}, finnhubCompanyResponseDto),
            } }),
        include: {
            company: true,
        },
    });
    return stock;
});
const updateStock = (id, finnhubStockResponseDto) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = yield DBClient_1.default.stock.update({
        data: Object.assign({}, finnhubStockResponseDto),
        where: {
            id: id.toUpperCase(),
        },
        include: {
            company: true,
        },
    });
    return stock;
});
const getStock = (stockId) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = yield DBClient_1.default.stock.findUnique({
        where: {
            id: stockId,
        },
        include: {
            company: true,
        },
    });
    if (!stock) {
        // create new stock if finnhub returns stock data
        const finnhubStockResponseDto = yield finnhub_service_1.default.fetchStock(stockId);
        // add company data upon creating new stock entity
        const FinnhubCompanyResponseDto = yield finnhub_service_1.default.fetchCompany(stockId);
        const newStock = yield createStock(stockId, finnhubStockResponseDto, FinnhubCompanyResponseDto);
        return newStock;
    }
    return stock;
});
const getStockSymbols = (stockGetSymbolsRequestDto) => {
    const MAX_NUM = 20;
    const { q, start = "0", num = "20" } = stockGetSymbolsRequestDto;
    // Get symbols that start with a given keyword
    const filteredSymbols = all_stock_symbols_json_1.default.filter((symbol) => new RegExp(`^${q}`, "i").test(symbol));
    return filteredSymbols.slice(parseInt(start), parseInt(start) + Math.min(parseInt(num), MAX_NUM));
};
const getAllStockSymbols = () => all_stock_symbols_json_1.default;
exports.default = {
    updateStock,
    getStock,
    getStockSymbols,
    getAllStockSymbols,
};
