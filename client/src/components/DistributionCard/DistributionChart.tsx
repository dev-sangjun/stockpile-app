import { FC } from "react";
import { Chart as ChartJS, Tooltip, ChartOptions, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Investment, Stocks } from "../../types/entity.types";
import { RootState } from "../../states/store";
import { getStocks } from "../../states/user.reducer";
import { Datasets } from "../../types/datasets.types";
import { CHART_BACKGROUND_COLOR } from "../../utils/chart.utils";
import { toUSD } from "../../utils/numeral.utils";

ChartJS.register(ArcElement, Tooltip);

interface DistributionChartProps {
  investments: Investment[];
}

const constructChartConfig = (
  investments: Investment[],
  stocks: Stocks
): {
  data: {
    labels: string[];
    datasets: Datasets;
  };
  options: ChartOptions<"pie">;
} => {
  const labels: string[] = [];
  const datasets: Datasets = [
    {
      label: "Value",
      data: [],
      backgroundColor: CHART_BACKGROUND_COLOR,
    },
  ];
  let totalInvestmentValue = 0;
  investments.forEach(investment => {
    const { stockId, quantity } = investment;
    labels.push(stockId);
    const value = (stocks?.[stockId]?.c || 0) * quantity;
    totalInvestmentValue += value;
    datasets[0].data.push(value);
  });
  return {
    data: {
      labels,
      datasets,
    },
    options: {
      plugins: {
        datalabels: {
          color: "white",
          font: {
            weight: "bold",
            size: 16,
          },
          formatter: (value: number) => {
            // handle overflowing labels
            // display labels only if the value's greater than 20% of the total value
            return value / totalInvestmentValue > 0.2
              ? toUSD(value, false)
              : null;
          },
        },
      },
    },
  };
};

const DistributionChart: FC<DistributionChartProps> = ({ investments }) => {
  const stocks = useSelector((state: RootState) => getStocks(state));
  const { data, options } = constructChartConfig(investments, stocks);
  return <Pie data={data} options={options} className="mx-auto w-full" />;
};

export default DistributionChart;
