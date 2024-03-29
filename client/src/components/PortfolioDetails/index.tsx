import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Portfolio, Stocks } from "../../global/entity.interfaces";
import Section, { SectionActionButton } from "../Section";
import { RootState } from "../../store";
import InnerGridItem, { InnerGridItemProps } from "../InnerGridItem";
import {
  getInvestedAmount,
  getPortfolioTotalValue,
} from "../../utils/entity.utils";
import { toUSD } from "../../utils/common.utils";
import ValueChangeText from "../ValueChangeText";
import { getUser } from "../../store/user.reducer";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";
import useDispatchActions from "../../hooks/useDispatchActions";

interface PortfolioDetailsProps {
  portfolio: Portfolio;
}

const getPortfolioDetailsGridItems = (
  portfolio: Portfolio,
  stocks: Stocks
): InnerGridItemProps[] => {
  const totalBalance = getPortfolioTotalValue(portfolio, stocks);
  const totalInvestedAmount = getInvestedAmount(portfolio.investments);
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

const PortfolioDetails: FC<PortfolioDetailsProps> = ({ portfolio }) => {
  const { portfolioActions, modalActions } = useDispatchActions();
  const { t } = useTranslation();
  const { stocks } = useSelector((state: RootState) => getUser(state));
  const renderInnerGridItems = () => (
    <div className="grid grid-cols gap-2">
      {getPortfolioDetailsGridItems(portfolio, stocks).map(item => (
        <InnerGridItem key={item.title} {...item} />
      ))}
    </div>
  );
  const actionButtons: SectionActionButton[] = [
    {
      icon: <HiPencilSquare />,
      onClick: () => modalActions.open("UPDATE_PORTFOLIO"),
    },
    {
      icon: <HiTrash />,
      onClick: () => modalActions.open("DELETE_PORTFOLIO"),
    },
  ];
  return (
    <Section
      className="h-fit"
      title={portfolio.name}
      backButton={{
        text: t("Portfolios"),
        onClick: portfolioActions.deselect,
      }}
      actionButtons={actionButtons}
    >
      {renderInnerGridItems()}
    </Section>
  );
};

export default PortfolioDetails;
