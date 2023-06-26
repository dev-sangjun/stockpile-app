import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Investment, Stocks } from "../../../global/entity.interfaces";
import Section from "../../common/Section";
import { deselectInvestment } from "../../../store/entity.reducer";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";
import { toDecimal, toUSD } from "../../../utils/common.utils";
import ValueChangeText from "../../common/ValueChangeText";
import {
  asyncAddToFavoriteStocks,
  asyncDeleteFromFavoriteStocks,
  getUser,
} from "../../../store/user.reducer";
import { BASE_BUTTON_CLASSES } from "../../../constants/classes.constants";
import {
  HiHeart,
  HiOutlineHeart,
  HiPencilSquare,
  HiTrash,
} from "react-icons/hi2";

interface InvestmentDetailsProps {
  investment: Investment;
}

const getInvestmentDetailsGridItems = (
  investment: Investment,
  stocks: Stocks
): InnerGridItemProps[] => {
  const { stockId, avgCost, quantity } = investment;
  const { c, pc } = stocks[stockId];
  const currentPrice = toDecimal(c);
  const previousPrice = toDecimal(pc);
  const totalBalance = toDecimal(currentPrice * quantity);
  const totalInvestedAmount = toDecimal(avgCost * quantity);
  return [
    {
      title: "Current Price",
      value: toUSD(currentPrice),
    },
    {
      title: "Shares",
      value: `${quantity}`,
    },

    {
      title: "Total Balance",
      value: toUSD(totalBalance),
    },
    {
      title: "Total Invested",
      value: toUSD(totalInvestedAmount),
    },
    {
      title: "Day Change",
      value: (
        <ValueChangeText prevValue={previousPrice} curValue={currentPrice} />
      ),
    },
    {
      title: "Total Gain/Loss",
      value: (
        <ValueChangeText
          prevValue={totalInvestedAmount}
          curValue={totalBalance}
        />
      ),
    },
  ];
};

const InvestmentDetails: FC<InvestmentDetailsProps> = ({ investment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, favoriteStocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  const isFavorite = favoriteStocks.includes(investment.stockId);
  const renderInnerGridItems = () => (
    <div className="grid grid-cols-2 gap-2">
      {getInvestmentDetailsGridItems(investment, stocks).map(item => (
        <InnerGridItem key={item.title} {...item} />
      ))}
    </div>
  );
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await dispatch(asyncDeleteFromFavoriteStocks(investment.stockId));
      return;
    }
    await dispatch(asyncAddToFavoriteStocks(investment.stockId));
  };
  return (
    <Section
      title={investment.stockId}
      backButton={{
        text: "Investments",
        onClick: () => dispatch(deselectInvestment()),
      }}
    >
      <div className="flex flex-col gap-4 h-96">
        {renderInnerGridItems()}
        <div className="flex justify-around gap-2">
          <button
            className={`${BASE_BUTTON_CLASSES.sm} text-red-500`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
          </button>
          <button className={BASE_BUTTON_CLASSES.sm}>
            <HiPencilSquare />
          </button>
          <button className={BASE_BUTTON_CLASSES.sm}>
            <HiTrash />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default InvestmentDetails;
