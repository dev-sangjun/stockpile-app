import DBClient from "../../prisma/DBClient";
import { FinnhubStockResponseDto } from "../interfaces/dto/finnhub.dto";
import {
  StockGetRequestDto,
  StockGetSymbolsRequestDto,
} from "../interfaces/dto/stock.dto";
import finnhubService from "./finnhub.service";
import allSymbols from "../data/all_symbols.json";

const STOCK_RESYNC_INTERVAL_IN_MS = 3600 * Math.pow(10, 3);
const needsResync = (updatedAt: Date) => {
  return (
    new Date().getTime() - updatedAt.getTime() > STOCK_RESYNC_INTERVAL_IN_MS
  );
};

const createStock = async (
  q: string,
  finnhubStockResponseDto: FinnhubStockResponseDto
) => {
  const stock = await DBClient.stock.create({
    data: {
      id: q.toUpperCase(),
      ...finnhubStockResponseDto,
    },
  });
  return stock;
};

const updateStock = async (
  id: string,
  finnhubStockResponseDto: FinnhubStockResponseDto
) => {
  const stock = await DBClient.stock.update({
    data: {
      ...finnhubStockResponseDto,
    },
    where: {
      id,
    },
  });
  return stock;
};

const getStock = async (stockGetRequestDto: StockGetRequestDto) => {
  const { q } = stockGetRequestDto;
  const stock = await DBClient.stock.findUnique({
    where: {
      id: q.toUpperCase(),
    },
  });
  if (!stock) {
    // create new stock if finnhub returns stock data
    const finnhubStockResponseDto: FinnhubStockResponseDto =
      await finnhubService.fetchStock(q);
    const newStock = await createStock(q, finnhubStockResponseDto);
    return newStock;
  }
  if (needsResync(stock.updated_at)) {
    const finnhubStockResponseDto: FinnhubStockResponseDto =
      await finnhubService.fetchStock(q);
    const updatedStock = await updateStock(q, finnhubStockResponseDto);
    return updatedStock;
  }
  return stock;
};

const getStockSymbols = (
  stockGetSymbolsRequestDto: StockGetSymbolsRequestDto
): string[] => {
  const MAX_NUM = 20;
  const { q, start = "0", num = "20" } = stockGetSymbolsRequestDto;
  // Get symbols that start with a given keyword
  const filteredSymbols: string[] = allSymbols.filter((symbol: string) =>
    new RegExp(`^${q}`, "i").test(symbol)
  );
  return filteredSymbols.slice(
    parseInt(start),
    parseInt(start) + Math.min(parseInt(num), MAX_NUM)
  );
};

export default {
  getStock,
  getStockSymbols,
};
