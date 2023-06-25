import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";
import { Investment, Stocks } from "../../../global/entity.interfaces";
import { toDecimal, toUSD } from "../../../utils/common.utils";
import {
  getInvestedAmount,
  getTotalNetWorth,
} from "../../../utils/entity.utils";
import ValueChangeText from "../../common/ValueChangeText";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";
import Section from "../../common/Section";

const getPortfolioOverviewGridItems = (
  investments: Investment[],
  stocks: Stocks
): InnerGridItemProps[] => {
  const totalBalance = getTotalNetWorth(investments, stocks);
  const totalInvestedAmount = getInvestedAmount(investments);
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

const PortfoliosOverview = () => {
  const { investments, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  const renderInnerGridItems = () => (
    <div className="grid grid-cols-2 gap-2">
      {getPortfolioOverviewGridItems(Object.values(investments), stocks).map(
        item => (
          <InnerGridItem key={item.title} {...item} />
        )
      )}
    </div>
  );

  return <Section title="Overview">{renderInnerGridItems()}</Section>;
};

export default PortfoliosOverview;
