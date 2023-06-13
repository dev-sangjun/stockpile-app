import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getFavoriteStocks, getStocks } from "../../states/user.reducer";
import FavoriteStockList from "./FavoriteStockList";
import { Stock } from "../../types/entity.types";

const FavoriteStocks: FC = () => {
  const favoriteStocks = useSelector((state: RootState) =>
    getFavoriteStocks(state)
  );
  const stocks = useSelector((state: RootState) => getStocks(state));
  const filteredFavoriteStocks = () => {
    const filteredFavoriteStocks: Stock[] = [];
    favoriteStocks.forEach(stockId => {
      const stock = stocks[stockId];
      filteredFavoriteStocks.push(stock);
    });
    return filteredFavoriteStocks;
  };
  return <FavoriteStockList stocks={filteredFavoriteStocks()} />;
};

export default FavoriteStocks;
