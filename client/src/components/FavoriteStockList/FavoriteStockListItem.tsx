import { FC } from "react";
import { Investment, Stock } from "../../global/entity.interfaces";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";
import { toDecimal, toUSD } from "../../utils/common.utils";
import ValueChangeText from "../ValueChangeText";
import useDispatchActions from "../../hooks/useDispatchActions";
import { BASE_BUTTON_CLASSES } from "../../constants/classes.constants";
import { HiHeart } from "react-icons/hi2";
import EntityListItem from "../EntityListItem";

interface FavoriteStockListItemProps {
  investment: Investment;
  stock: Stock;
  quantity: number;
}

const getFavoriteStockGridItems = (
  investment: Investment,
  stock: Stock,
  quantity: number
): InnerGridItemProps[] => {
  const totalInvestedAmount = toDecimal(investment.avgCost * quantity);
  const totalBalance = toDecimal(stock.c * quantity);
  return [
    {
      className: "col-span-2",
      title: "Current Price",
      value: toUSD(stock.c),
    },
    {
      className: "col-span-2",
      title: "Day Change",
      value: <ValueChangeText prevValue={stock.pc} curValue={stock.c} />,
    },

    {
      className: "col-span-3",
      title: "Total Gain/Loss",
      value: (
        <ValueChangeText
          prevValue={totalInvestedAmount}
          curValue={totalBalance}
        />
      ),
    },
    {
      title: "Shares",
      value: `${quantity}`,
    },
  ];
};

const FavoriteStockListItem: FC<FavoriteStockListItemProps> = ({
  investment,
  stock,
  quantity,
}) => {
  const { stockActions } = useDispatchActions();
  const handleFavoriteClick = () => {
    stockActions.deleteFromFavorites(stock.id);
  };

  const renderInnerGridItems = () => (
    <div className="grid grid-cols-4 gap-2 min-w-[24rem]">
      {getFavoriteStockGridItems(investment, stock, quantity).map(item => (
        <InnerGridItem key={item.title} {...item} />
      ))}
    </div>
  );
  const favoriteButton = (
    <button className={BASE_BUTTON_CLASSES.sm} onClick={handleFavoriteClick}>
      <HiHeart className="text-red-500" />
    </button>
  );
  return (
    <div className="flex flex-col">
      <EntityListItem
        className="border-none hover:cursor-default"
        title={investment.stockId}
        icon={favoriteButton}
      />
      {renderInnerGridItems()}
    </div>
  );
};

export default FavoriteStockListItem;
