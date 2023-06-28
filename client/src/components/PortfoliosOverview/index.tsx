import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { getUser } from "../../store/user.reducer";
import { Investment, Stocks } from "../../global/entity.interfaces";
import { toUSD } from "../../utils/common.utils";
import { getInvestedAmount, getTotalNetWorth } from "../../utils/entity.utils";
import ValueChangeText from "../ValueChangeText";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";
import Section from "../Section";

const getPortfolioOverviewGridItems = (
  investments: Investment[],
  stocks: Stocks
): InnerGridItemProps[] => {
  const totalBalance = getTotalNetWorth(investments, stocks);
  const totalInvestedAmount = getInvestedAmount(investments);
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
      title: "Total Gain/Loss",
      className: "col-span-2",
      value: (
        <ValueChangeText
          prevValue={totalInvestedAmount}
          curValue={totalBalance}
        />
      ),
    },
  ];
};

const PortfoliosOverview = () => {
  const { t } = useTranslation();
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

  return <Section title={t("Overview")}>{renderInnerGridItems()}</Section>;
};

export default PortfoliosOverview;
