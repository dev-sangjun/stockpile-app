import { FC } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors,
  ChartOptions,
  ChartData,
  ChartDataset,
} from "chart.js";
import {
  getPortfolioTotalValue,
  sortPortfoliosByValue,
} from "../../../utils/entity.utils";
import { toUSD } from "../../../utils/common.utils";
import { Portfolio, Stocks } from "../../../global/entity.interfaces";
import { CHART_BACKGROUND_COLOR } from "../../../constants/chart.constants";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors
);

interface BarChartProps {
  portfolios: Portfolio[];
}

const constructChartConfig = (
  portfolios: Portfolio[],
  stocks: Stocks
): {
  data: ChartData<"bar", number[], string>;
  options?: ChartOptions<"bar">;
} => {
  const labels: string[] = [];
  const datasets: ChartDataset<"bar", number[]>[] = [
    {
      data: [],
      backgroundColor: CHART_BACKGROUND_COLOR,
      borderRadius: 12,
      borderSkipped: false,
      maxBarThickness: 72,
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
  ];
  let maxPortfolioValue = 0;
  sortPortfoliosByValue(portfolios, stocks).forEach(portfolio => {
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
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: context => {
              return `Total value: ${toUSD(context.formattedValue)}`;
            },
          },
          yAlign: "bottom",
        },
        datalabels: {
          formatter: () => null,
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
        },
        y: {
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  };
};

const BarChart: FC<BarChartProps> = ({ portfolios }) => {
  const { stocks } = useSelector((state: RootState) => getUser(state));
  return (
    <div className="flex-1 mt-4">
      <Bar {...constructChartConfig(portfolios, stocks)} />
    </div>
  );
};

export default BarChart;
