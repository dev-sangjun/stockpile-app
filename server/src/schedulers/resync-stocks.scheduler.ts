import DBClient from "../../prisma/DBClient";
import { FinnhubStockResponseDto } from "../interfaces/dto/finnhub.dto";
import { stockService } from "../services";
import finnhubService from "../services/finnhub.service";

const resyncStocks = async () => {
  const startTime = new Date().getTime();
  const stocks = await DBClient.stock.findMany({
    select: {
      id: true,
    },
  });
  const stockIds = stocks.map(stock => stock.id);
  for (const stockId of stockIds) {
    try {
      const finnhubStockResponseDto: FinnhubStockResponseDto =
        await finnhubService.fetchStock(stockId);
      await stockService.updateStock(stockId, finnhubStockResponseDto);
    } catch (e) {
      console.error(e);
      console.log(`There was an error while updating ${stockId}`);
    }
  }
  const endTime = new Date().getTime();
  console.log(`Resync complete in ${endTime - startTime}ms`);
};

export default resyncStocks;
