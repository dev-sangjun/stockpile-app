import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Investment, Stocks } from "../../../global/entity.interfaces";
import Section, { SectionActionButton } from "../../common/Section";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";
import { toDecimal, toUSD } from "../../../utils/common.utils";
import ValueChangeText from "../../common/ValueChangeText";
import { getUser } from "../../../store/user.reducer";
import {
  HiHeart,
  HiOutlineHeart,
  HiPencilSquare,
  HiTrash,
} from "react-icons/hi2";
import useDispatchActions from "../../../hooks/useDispatchActions";

interface InvestmentDetailsProps {
  investment: Investment;
}

const getInvestmentDetailsGridItems = (
  investment: Investment,
  stocks: Stocks
): InnerGridItemProps[] => {
  const { stockId, avgCost, quantity } = investment;
  const stock = stocks[stockId];
  if (!stock) {
    return [];
  }
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
      title: "Day Change",
      value: (
        <ValueChangeText prevValue={previousPrice} curValue={currentPrice} />
      ),
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

const InvestmentDetails: FC<InvestmentDetailsProps> = ({ investment }) => {
  const { investmentActions, stockActions, modalActions } =
    useDispatchActions();
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
  const actionButtons: SectionActionButton[] = [
    {
      icon: isFavorite ? (
        <HiHeart className="text-red-500" />
      ) : (
        <HiOutlineHeart className="text-red-500" />
      ),
      onClick: isFavorite
        ? () => stockActions.deleteFromFavorites(investment.stockId)
        : () => stockActions.addToFavorites(investment.stockId),
    },
    {
      icon: <HiPencilSquare />,
      onClick: () => modalActions.open("UPDATE_INVESTMENT"),
    },
    {
      icon: <HiTrash />,
      onClick: () => modalActions.open("DELETE_INVESTMENT"),
    },
  ];
  return (
    <Section
      title={investment.stockId}
      backButton={{
        text: "Investments",
        onClick: investmentActions.deselect,
      }}
      actionButtons={actionButtons}
    >
      <div className="flex flex-col gap-4 h-96">{renderInnerGridItems()}</div>
    </Section>
  );
};

export default InvestmentDetails;
