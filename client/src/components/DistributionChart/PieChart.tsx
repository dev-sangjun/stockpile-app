import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
import { RootState } from "../../store";
import { Investment } from "../../global/entity.interfaces";
import { CHART_BACKGROUND_COLOR } from "../../constants/chart.constants";
import { getUser } from "../../store/user.reducer";
import { toDecimal, toUSD } from "../../utils/common.utils";

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface PieChartProps {
  investments: Investment[];
}

const PieChart: FC<PieChartProps> = ({ investments }) => {
  const { t } = useTranslation();
  const { stocks } = useSelector((state: RootState) => getUser(state));
  const constructChartConfig = (): {
    data: ChartData<"pie", number[], string>;
    options: ChartOptions<"pie">;
  } => {
    const labels: string[] = [];
    const datasets: ChartDataset<"pie", number[]>[] = [
      {
        label: t("Value"),
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
              beforeLabel: ({ formattedValue }) => {
                return `${t("Value")}: ${toUSD(formattedValue)}`;
              },
              label({ raw }) {
                return `${t("Portion")}: ${toDecimal(
                  ((raw as number) / totalInvestmentValue) * 100
                )}%`;
              },
              afterLabel({ dataIndex }) {
                return `${t("Qty")}: ${investments[dataIndex].quantity}`;
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
  return <Pie {...constructChartConfig()} className="mx-auto w-full" />;
};

export default PieChart;
