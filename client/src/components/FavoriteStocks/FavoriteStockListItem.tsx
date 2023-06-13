import { FC } from "react";
import { Stock } from "../../types/entity.types";
import FavoritesButton from "../FavoritesButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncDeleteFromFavoriteStocks } from "../../states/user.reducer";
import EntityListItem from "../EntityListItem";

interface StockListItemProps {
  stock: Stock;
  quantity: number;
}

const FavoriteStockListItem: FC<StockListItemProps> = ({ stock, quantity }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleFavoriteClick = () => {
    dispatch(asyncDeleteFromFavoriteStocks(stock.id));
  };
  const actionButtons = (
    <FavoritesButton isFavorite={true} onClick={handleFavoriteClick} />
  );
  return (
    <EntityListItem
      className="carousel-item"
      entityType="FavoriteStock"
      logoUrl={stock.company.logo}
      title={stock.id}
      actionButtons={actionButtons}
      valueLabel="Current Price"
      entityDetails={{ stock, quantity }}
    />
  );
};

export default FavoriteStockListItem;
