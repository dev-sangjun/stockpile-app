import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";
import { Investment, Stocks } from "../../../global/entity.interfaces";
import { toDecimal, toUSD } from "../../../utils/common.utils";
import {
  getTotalInvestedAmount,
  getTotalNetWorth,
} from "../../../utils/entity.utils";
import ValueChangeText from "../../common/ValueChangeText";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";

const getPortfolioOverviewGridItems = (
  investments: Investment[],
  stocks: Stocks
): InnerGridItemProps[] => {
  const totalNetWorth = getTotalNetWorth(investments, stocks);
  const totalInvestedAmount = getTotalInvestedAmount(investments);
  const gainLoss = totalNetWorth - totalInvestedAmount;
  return [
    {
      title: "Total Value",
      value: toUSD(totalNetWorth),
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

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Overview</h2>
      {renderInnerGridItems()}
    </div>
  );
};

export default PortfoliosOverview;
