import { FC, useMemo } from "react";
import { Investment } from "../../types/entity.types";
import { toUSD } from "../../utils/numeral.utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { asyncFetchStocks, getStocks } from "../../states/stocks.reducer";
import ValueChangeText from "../ValueChangeText";
import { GridItemProps } from "../ListGridItem";
import { renderGridItems } from "../ListGridItem/renderer";
import {
  asyncFetchPortfolios,
  getSelectedPortfolio,
} from "../../states/portfolios.reducer";
import { renderCompanyLogo } from "./renderer";
import { HiTrash } from "react-icons/hi2";
import { deleteInvestment } from "../../utils/api.utils";
import { TEST_USER_ID } from "../../dev/constants";

interface InvestmentItemProps {
  investment: Investment;
}

const InvestmentListItem: FC<InvestmentItemProps> = ({ investment }) => {
  const stocks = useSelector((state: RootState) => getStocks(state));
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const dispatch = useDispatch<AppDispatch>();
  const investmentDetails = useMemo(() => {
    const totalValue = stocks?.[investment.stockId]?.c * investment.quantity;
    const totalCost = investment.avgCost * investment.quantity;
    const dayChange =
      stocks?.[investment.stockId]?.c - stocks?.[investment.stockId]?.pc;
    return {
      totalValue,
      totalCost,
      quantity: investment.quantity,
      dayChange,
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
  const handleDeleteInvestment = async () => {
    if (!selectedPortfolio) {
      return;
    }
    await deleteInvestment({
      portfolioId: selectedPortfolio.id,
      investmentId: investment.id,
    });
    dispatch(asyncFetchStocks(TEST_USER_ID)).then(() =>
      dispatch(asyncFetchPortfolios(TEST_USER_ID))
    );
  };
  return (
    <li className="card bg-base-100 shadow-xl p-4 flex flex-col gap-4">
      <div className="flex items-center h-30 gap-2">
        <div className="flex flex-1 items-center gap-2">
          {renderCompanyLogo(investment, stocks)}
          <h3 className="text-lg font-bold">{investment.stockId}</h3>
          {selectedPortfolio && (
            <button
              className="btn btn-xs btn-ghost"
              onClick={handleDeleteInvestment}
            >
              <HiTrash />
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400">
            Current Price
          </span>
          <span className="font-bold text-lg">
            {toUSD(stocks?.[investment.stockId]?.c || 0)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">{renderGridItems(gridItems)}</div>
    </li>
  );
};

export default InvestmentListItem;
