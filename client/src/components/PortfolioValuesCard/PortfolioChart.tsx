import { FC } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Portfolio, Stocks } from "../../types/entity.types";
import { RootState } from "../../states/store";
import { getStocks } from "../../states/user.reducer";
import { getPortfolioTotalValue } from "../../utils/entity.utils";
import { Datasets } from "../../types/datasets.types";
import { CHART_BACKGROUND_COLOR } from "../../utils/chart.utils";
import { toUSD } from "../../utils/numeral.utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors,
  ChartDataLabels
);

interface PortfolioChartProps {
  portfolios: Portfolio[];
}

const constructChartConfig = (
  portfolios: Portfolio[],
  stocks: Stocks
): {
  data: {
    labels: string[];
    datasets: Datasets;
  };
  options: ChartOptions<"bar">;
} => {
  const labels: string[] = [];
  const datasets: Datasets = [
    {
      label: "Total Value",
      data: [],
      backgroundColor: CHART_BACKGROUND_COLOR,
      dataLabels: {
        align: "end",
      },
    },
  ];
  let maxPortfolioValue = 0;
  portfolios.forEach(portfolio => {
    labels.push(portfolio.name);
    const portfolioTotalValue = getPortfolioTotalValue(portfolio, stocks);
    maxPortfolioValue = Math.max(maxPortfolioValue, portfolioTotalValue);
    datasets[0].data.push(portfolioTotalValue);
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
            return value / maxPortfolioValue > 0.2 ? toUSD(value) : null;
          },
        },
      },
    },
  };
};

const PortfolioChart: FC<PortfolioChartProps> = ({ portfolios }) => {
  const stocks = useSelector((state: RootState) => getStocks(state));
  const { data, options } = constructChartConfig(portfolios, stocks);
  return <Bar data={data} options={options} className="my-auto p-2 md:p-8" />;
};

export default PortfolioChart;
