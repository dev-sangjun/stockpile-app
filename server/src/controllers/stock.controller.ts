import { NextFunction, Request, Response } from "express";
import { StockGetRequestDto } from "../interfaces/dto/stock.dto";
import { stockService } from "../services";

const getStock = async (
  req: Request<{ q: string }>,
  res: Response,
  next: NextFunction
) => {
  const stockGetRequestDto: StockGetRequestDto = req.params;
  try {
    const stock = await stockService.getStock(stockGetRequestDto);
    return res.json(stock);
  } catch (e) {
    return next(e);
  }
};

export default {
  getStock,
};
