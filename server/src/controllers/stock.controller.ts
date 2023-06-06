import { NextFunction, Request, Response } from "express";
import { StockGetSymbolsRequestDto } from "../interfaces/dto/stock.dto";
import { stockService } from "../services";

const getStock = async (
  req: Request<{ q: string }>,
  res: Response,
  next: NextFunction
) => {
  const { q } = req.params;
  try {
    const stock = await stockService.getStock(q.toUpperCase());
    return res.json(stock);
  } catch (e) {
    return next(e);
  }
};

const getStockSymbols = (
  req: Request<undefined, any, any, StockGetSymbolsRequestDto>,
  res: Response
) => {
  const stockGetSymbolRequestDto: StockGetSymbolsRequestDto = req.query;
  const stock = stockService.getStockSymbols(stockGetSymbolRequestDto);
  return res.json(stock);
};

const getAllStockSymbols = (req: Request, res: Response) => {
  const allStockSymbols = stockService.getAllStockSymbols();
  return res.json(allStockSymbols);
};

export default {
  getStock,
  getStockSymbols,
  getAllStockSymbols,
};
