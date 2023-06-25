import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Portfolio, Stocks } from "../../../global/entity.interfaces";
import Section from "../../common/Section";
import { AppDispatch, RootState } from "../../../store";
import { deselectPortfolio } from "../../../store/entity.reducer";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";
import {
  getInvestedAmount,
  getPortfolioTotalValue,
} from "../../../utils/entity.utils";
import { toDecimal, toUSD } from "../../../utils/common.utils";
import ValueChangeText from "../../common/ValueChangeText";
import { getUser } from "../../../store/user.reducer";

interface PortfolioDetailsProps {
  portfolio: Portfolio;
}

const getPortfolioDetailsGridItems = (
  portfolio: Portfolio,
  stocks: Stocks
): InnerGridItemProps[] => {
  const totalBalance = getPortfolioTotalValue(portfolio, stocks);
  const totalInvestedAmount = getInvestedAmount(portfolio.investments);
  const gainLoss = totalBalance - totalInvestedAmount;
  return [
    {
      title: "Total Balance",
      value: toUSD(totalBalance),
    },
    {
      title: "Total Invested",
      value: toUSD(totalInvestedAmount),
    },
    {
      title: "Total Gain/Loss ($)",
      value: <ValueChangeText value={gainLoss} />,
    },
    {
      title: "Total Gain/Loss (%)",
      value: (
        <ValueChangeText
          value={toDecimal(gainLoss / totalInvestedAmount) * 100}
          usePercentage={true}
        />
      ),
    },
  ];
};

const PortfolioDetails: FC<PortfolioDetailsProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks } = useSelector((state: RootState) => getUser(state));
  const renderInnerGridItems = () => (
    <div className="grid grid-cols-2 gap-2">
      {getPortfolioDetailsGridItems(portfolio, stocks).map(item => (
        <InnerGridItem key={item.title} {...item} />
      ))}
    </div>
  );
  return (
    <Section
      title={portfolio.name}
      backButton={{
        text: "Portfolios",
        onClick: () => dispatch(deselectPortfolio()),
      }}
    >
      {renderInnerGridItems()}
    </Section>
  );
};

export default PortfolioDetails;
