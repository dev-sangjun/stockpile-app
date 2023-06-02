import { FC, ReactNode, useMemo } from "react";
import { Investment } from "../../types/entity.types";
import { toUSD } from "../../utils/numeral.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getStocks } from "../../states/stocks.reducer";
import ValueChangeText from "../ValueChangeText";
import { HiBuildingOffice2 } from "react-icons/hi2";

interface GridItemProps {
  title: string;
  text: string | ReactNode;
}

const GridItem: FC<GridItemProps> = ({ title, text }) => (
  <div className="bg-slate-100 rounded-lg p-2 flex flex-col gap-2">
    <h4 className="text-slate-500 text-sm">{title}</h4>
    <div className="font-bold">{text}</div>
  </div>
);

interface InvestmentItemProps {
  investment: Investment;
}

const InvestmentListItem: FC<InvestmentItemProps> = ({ investment }) => {
  const stocks = useSelector((state: RootState) => getStocks(state));
  const investmentDetails = useMemo(() => {
    const totalValue = stocks?.[investment.stockId]?.c * investment.quantity;
    const totalCost = investment.avgCost * investment.quantity;
    const prevTotalValue =
      stocks?.[investment.stockId]?.pc * investment.quantity;

    return {
      totalValue,
      totalCost,
      quantity: investment.quantity,
      dayChange: totalValue - prevTotalValue,
    };
  }, [investment, stocks]);
  const gridItems: GridItemProps[] = useMemo(
    () => [
      {
        title: "Invested Amount",
        text: toUSD(investmentDetails.totalCost),
      },
      {
        title: "Gain/Loss",
        text: (
          <ValueChangeText
            value={investmentDetails.totalValue - investmentDetails.totalCost}
          />
        ),
      },
      {
        title: "Day Change",
        text: <ValueChangeText value={investmentDetails.dayChange} />,
      },
      {
        title: "# of Shares",
        text: String(investmentDetails.quantity),
      },
    ],
    [investmentDetails]
  );
  const renderGridItems = () =>
    gridItems.map(gridItem => <GridItem key={gridItem.title} {...gridItem} />);
  const getCompanyLogo = () => {
    const logoUrl = stocks?.[investment.stockId]?.company?.logo;
    return logoUrl ? (
      <div className="rounded-xl overflow-hidden w-10 shadow-xl">
        <img
          src={logoUrl}
          alt={stocks?.[investment.stockId]?.company?.name || "company"}
        />
      </div>
    ) : (
      <div className="flex justify-center items-center rounded-xl w-10 h-10 text-xl shadow-xl bg-slate-500 text-base-100">
        <HiBuildingOffice2 />
      </div>
    );
  };
  return (
    <li className="card bg-base-100 shadow-xl p-4 flex flex-col gap-4">
      <div className="flex items-center h-30 gap-2">
        {getCompanyLogo()}
        <h3 className="flex-1 text-lg font-bold">{investment.stockId}</h3>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400">
            Current Price
          </span>
          <span className="font-bold text-lg">
            {toUSD(stocks?.[investment.stockId]?.c || 0)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">{renderGridItems()}</div>
    </li>
  );
};

export default InvestmentListItem;
