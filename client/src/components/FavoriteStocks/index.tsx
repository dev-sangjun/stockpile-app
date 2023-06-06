import { FC } from "react";
import { Stock } from "../../types/entity.types";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getFavoriteStocks } from "../../states/user.reducer";
import { renderStockListItems } from "./renderers";

const FavoriteStocks: FC = () => {
  const favoriteStocks = useSelector((state: RootState) =>
    getFavoriteStocks(state)
  );
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Favorite Stocks</h2>
      {renderStockListItems([])}
    </div>
  );
};

export default FavoriteStocks;
