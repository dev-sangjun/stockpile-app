import DBClient from "../../prisma/DBClient";
import {
  FinnhubCompanyResponseDto,
  FinnhubStockResponseDto,
} from "../interfaces/dto/finnhub.dto";
import { StockGetSymbolsRequestDto } from "../interfaces/dto/stock.dto";
import finnhubService from "./finnhub.service";
import allStockSymbols from "../data/all_stock_symbols.json";

const createStock = async (
  q: string,
  finnhubStockResponseDto: FinnhubStockResponseDto,
  finnhubCompanyResponseDto: FinnhubCompanyResponseDto
) => {
  const stock = await DBClient.stock.create({
    data: {
      id: q.toUpperCase(),
      ...finnhubStockResponseDto,
      company: {
        create: {
          ...finnhubCompanyResponseDto,
        },
      },
    },
    include: {
      company: true,
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
      id: id.toUpperCase(),
    },
    include: {
      company: true,
    },
  });
  return stock;
};

const getStock = async (stockId: string) => {
  const stock = await DBClient.stock.findUnique({
    where: {
      id: stockId,
    },
    include: {
      company: true,
    },
  });
  if (!stock) {
    // create new stock if finnhub returns stock data
    const finnhubStockResponseDto: FinnhubStockResponseDto =
      await finnhubService.fetchStock(stockId);
    // add company data upon creating new stock entity
    const FinnhubCompanyResponseDto: FinnhubCompanyResponseDto =
      await finnhubService.fetchCompany(stockId);
    const newStock = await createStock(
      stockId,
      finnhubStockResponseDto,
      FinnhubCompanyResponseDto
    );
    return newStock;
  }
  return stock;
};

const getStockSymbols = (
  stockGetSymbolsRequestDto: StockGetSymbolsRequestDto
): string[] => {
  const MAX_NUM = 20;
  const { q, start = "0", num = "20" } = stockGetSymbolsRequestDto;
  // Get symbols that start with a given keyword
  const filteredSymbols: string[] = allStockSymbols.filter((symbol: string) =>
    new RegExp(`^${q}`, "i").test(symbol)
  );
  return filteredSymbols.slice(
    parseInt(start),
    parseInt(start) + Math.min(parseInt(num), MAX_NUM)
  );
};

const getAllStockSymbols = () => allStockSymbols;

export default {
  updateStock,
  getStock,
  getStockSymbols,
  getAllStockSymbols,
};
