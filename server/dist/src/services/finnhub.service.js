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
const is_empty_1 = __importDefault(require("is-empty"));
const errors_global_1 = require("../global/errors.global");
const { FINNHUB_API_ENDPOINT, FINNHUB_API_KEY } = process.env;
const getFetchStockUrl = (q) => `${FINNHUB_API_ENDPOINT}/quote?symbol=${q}&token=${FINNHUB_API_KEY}`;
const getFetchCompanyUrl = (q) => `${FINNHUB_API_ENDPOINT}/stock/profile2?symbol=${q}&token=${FINNHUB_API_KEY}`;
// finnhub will return non-empty response with c == 0 & pc == 0 for invalid stock symobl
const isStockResponseValid = (stockResponseDto) => stockResponseDto.c !== 0 && stockResponseDto.pc !== 0;
// Some symbols need to be fetched in lowercase
const lowerCaseSymbols = ["FXAIX"];
/**
 *
 * @param q stock symbol
 * @returns stock data
 */
const fetchStock = (q) => __awaiter(void 0, void 0, void 0, function* () {
    const stockResponseDto = yield fetch(getFetchStockUrl(lowerCaseSymbols.includes(q) ? q.toLowerCase() : q), {
        cache: "no-cache",
    }).then(res => res.json());
    if (!isStockResponseValid(stockResponseDto)) {
        throw new errors_global_1.ResourceNotFoundError();
    }
    const { c, d, dp, h, l, pc } = stockResponseDto;
    return {
        c,
        d,
        dp,
        h,
        l,
        pc,
    };
});
/**
 *
 * @param q company's stock symbol
 * @returns company data
 */
const fetchCompany = (q) => __awaiter(void 0, void 0, void 0, function* () {
    const companyResponseDto = yield fetch(getFetchCompanyUrl(lowerCaseSymbols.includes(q) ? q.toLowerCase() : q), {
        cache: "no-cache",
    }).then(res => res.json());
    if ((0, is_empty_1.default)(companyResponseDto)) {
        return {
            name: "N/A",
            logo: "",
        };
    }
    const { name, logo } = companyResponseDto;
    return { name, logo };
});
exports.default = {
    fetchStock,
    fetchCompany,
};
