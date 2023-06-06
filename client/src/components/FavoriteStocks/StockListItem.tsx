import { FC } from "react";
import { Stock } from "../../types/entity.types";

interface StockListItemProps {
  stock: Stock;
}

const StockListItem: FC<StockListItemProps> = ({ stock }) => {
  return <div>StockListItem</div>;
};

export default StockListItem;
