import { Stock } from "../../types/entity.types";
import StockListItem from "./StockListItem";

export const renderStockListItems = (stocks: Stock[]) => (
  <ul className="menu menu-sm bg-base-200 w-full rounded-box">
    {stocks.map(stock => (
      <StockListItem key={stock.id} stock={stock} />
    ))}
  </ul>
);
