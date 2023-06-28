import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { HiPlus } from "react-icons/hi2";
import { getUser } from "../../store/user.reducer";
import Section from "../Section";
import EntityListItem from "../EntityListItem";
import { RootState } from "../../store";
import { toDecimal, toUSD } from "../../utils/common.utils";
import { Portfolio } from "../../global/entity.interfaces";
import Fallback from "../Fallback";
import { ENTITY_LIST_CLASSES } from "../../constants/classes.constants";
import useDispatchActions from "../../hooks/useDispatchActions";
import { useFallbackMessages } from "../../constants/messages.constants";

interface InvestmentListProps {
  portfolio: Portfolio;
}

const InvestmentList: FC<InvestmentListProps> = ({ portfolio }) => {
  const { investmentActions, modalActions } = useDispatchActions();
  const { t } = useTranslation();
  const fallbackMessages = useFallbackMessages();
  const { stocks } = useSelector((state: RootState) => getUser(state));
  const renderInvestmentListItems = () =>
    portfolio.investments.length > 0 ? (
      <div className={`${ENTITY_LIST_CLASSES} h-96`}>
        {portfolio.investments.map(investment => {
          const investmentValue = toDecimal(
            (stocks?.[investment.stockId]?.c || 0) * investment.quantity
          );
          return (
            <EntityListItem
              key={investment.id}
              title={investment.stockId}
              label={{
                title: "Current Balance",
                value: toUSD(investmentValue),
              }}
              onClick={() => investmentActions.select(investment)}
            />
          );
        })}
      </div>
    ) : (
      <Fallback className="h-[24rem]" message={fallbackMessages.investments} />
    );
  return (
    <Section
      title={`${t("Investments")} (${portfolio.investments.length})`}
      actionButtons={[
        {
          icon: <HiPlus />,
          onClick: () => modalActions.open("ADD_INVESTMENT"),
        },
      ]}
    >
      {renderInvestmentListItems()}
    </Section>
  );
};

export default InvestmentList;
