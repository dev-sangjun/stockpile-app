import { FC } from "react";
import { Stock } from "../../types/entity.types";
import FavoritesButton from "../FavoritesButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { asyncDeleteFromFavoriteStocks } from "../../states/user.reducer";
import { toUSD } from "../../utils/numeral.utils";
import { renderFavoriteStockGridItems } from "../EntityListGridItem/renderer";
import { getUserId } from "../../states/user.reducer";

interface StockListItemProps {
  stock: Stock;
  quantity: number;
}

const StockListItem: FC<StockListItemProps> = ({ stock, quantity }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => getUserId(state));
  const handleFavoriteClick = () => {
    if (!userId) {
      return;
    }
    dispatch(asyncDeleteFromFavoriteStocks(stock.id));
  };
  return (
    <li className="carousel-item card bg-base-100 min-w-[14rem] md:min-w-[32rem] p-4 flex flex-col gap-4 overflow-hidden">
      <div className="flex items-center h-30 gap-2">
        <div className="flex flex-1 items-center gap-2">
          <h3 className="text-lg font-bold">{stock.id}</h3>
          <FavoritesButton isFavorite={true} onClick={handleFavoriteClick} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400">
            Current Price
          </span>
          <span className="font-bold text-lg">{toUSD(stock.c)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {renderFavoriteStockGridItems(stock, quantity)}
      </div>
    </li>
  );
};

export default StockListItem;
