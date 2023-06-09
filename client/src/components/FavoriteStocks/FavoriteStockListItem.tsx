import { FC, useMemo } from "react";
import { Stock } from "../../types/entity.types";
import FavoritesButton from "../FavoritesButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { asyncDeleteFromFavoriteStocks } from "../../states/user.reducer";
import { toUSD } from "../../utils/numeral.utils";
import { renderGridItems } from "../ListGridItem/renderer";
import { GridItemProps } from "../ListGridItem";
import ValueChangeText from "../ValueChangeText";
import { getUserId } from "../../states/user.reducer";

interface StockListItemProps {
  stock: Stock;
  quantity: number;
}

const StockListItem: FC<StockListItemProps> = ({ stock, quantity }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => getUserId(state));
  const gridItems: GridItemProps[] = useMemo(
    () => [
      {
        title: "Day Change",
        text: <ValueChangeText value={stock.c - stock.pc} />,
      },
      {
        title: "# of Shares",
        text: String(quantity),
      },
    ],
    [stock, quantity]
  );
  const handleFavoriteClick = () => {
    if (!userId) {
      return;
    }
    dispatch(
      asyncDeleteFromFavoriteStocks({
        userId: userId,
        stockId: stock.id,
      })
    );
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
      <div className="grid grid-cols-2 gap-2">{renderGridItems(gridItems)}</div>
    </li>
  );
};

export default StockListItem;
