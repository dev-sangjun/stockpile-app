import { FC } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  ChartOptions,
  ArcElement,
  ChartDataset,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Investment, Stocks } from "../../../global/entity.interfaces";
import { CHART_BACKGROUND_COLOR } from "../../../constants/chart.constants";
import { getUser } from "../../../store/user.reducer";
import { toDecimal, toUSD } from "../../../utils/common.utils";

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface PieChartProps {
  investments: Investment[];
}

const constructChartConfig = (
  investments: Investment[],
  stocks: Stocks
): {
  data: ChartData<"pie", number[], string>;
  options: ChartOptions<"pie">;
} => {
  const labels: string[] = [];
  const datasets: ChartDataset<"pie", number[]>[] = [
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
        tooltip: {
          callbacks: {
            label: ({ formattedValue }) => {
              return `Total value: ${toUSD(formattedValue)}`;
            },
            afterLabel({ raw }) {
              return `${toDecimal(
                ((raw as number) / totalInvestmentValue) * 100
              )}%`;
            },
          },
          yAlign: "bottom",
        },
        datalabels: {
          color: "white",
          font: {
            weight: "bold",
            size: 16,
          },
          formatter: (value: number, { dataIndex }) => {
            // handle overflowing labels
            // display labels only if the value's greater than 20% of the total value
            const label = labels.at(dataIndex);
            return value / totalInvestmentValue > 0.2 ? label : null;
          },
        },
      },
    },
  };
};

const PieChart: FC<PieChartProps> = ({ investments }) => {
  const { stocks } = useSelector((state: RootState) => getUser(state));
  const { data, options } = constructChartConfig(investments, stocks);
  return <Pie data={data} options={options} className="mx-auto w-full" />;
};

export default PieChart;
