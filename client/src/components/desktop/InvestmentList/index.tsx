import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/user.reducer";
import Section from "../../common/Section";
import EntityListItem from "../EntityListItem";
import { AppDispatch, RootState } from "../../../store";
import { toDecimal, toUSD } from "../../../utils/common.utils";
import { selectInvestment } from "../../../store/entity.reducer";
import { Portfolio } from "../../../global/entity.interfaces";
import Fallback from "../../common/Fallback";
import { fallbackMessages } from "../../../constants/messages.constants";
import { ENTITY_LIST_CLASSES } from "../../../constants/classes.constants";

interface InvestmentListProps {
  portfolio: Portfolio;
}

const InvestmentList: FC<InvestmentListProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
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
              title={investment.stockId}
              labelTitle="Current Value"
              labelValue={toUSD(investmentValue)}
              onClick={() => dispatch(selectInvestment(investment))}
            />
          );
        })}
      </div>
    ) : (
      <Fallback className="h-[24rem]" message={fallbackMessages.investments} />
    );
  return (
    <Section title={`Investments (${portfolio.investments.length})`}>
      {renderInvestmentListItems()}
    </Section>
  );
};

export default InvestmentList;
