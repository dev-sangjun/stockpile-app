import { useSelector } from "react-redux";
import { getUser } from "../../../store/user.reducer";
import Section from "../../common/Section";
import EntityListItem from "../EntityListItem";
import { RootState } from "../../../store";
import { getPortfolioTotalValue } from "../../../utils/entity.utils";
import { toUSD } from "../../../utils/common.utils";
import { ENTITY_LIST_CLASSES } from "../../../constants/classes.constants";
import { HiPlus } from "react-icons/hi2";
import useDispatchActions from "../../../hooks/useDispatchActions";
import Fallback from "../../common/Fallback";
import { fallbackMessages } from "../../../constants/messages.constants";

const PortfolioList = () => {
  const { portfolioActions, modalActions } = useDispatchActions();
  const { portfolios, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  const renderPortfolioListItems = () =>
    portfolios.length > 0 ? (
      <div className={`${ENTITY_LIST_CLASSES} h-full`}>
        {portfolios.map(portfolio => {
          const totalBalance = getPortfolioTotalValue(portfolio, stocks);
          return (
            <EntityListItem
              key={portfolio.id}
              title={portfolio.name}
              labelTitle="Total Balance"
              labelValue={toUSD(totalBalance)}
              onClick={() => portfolioActions.select(portfolio)}
            />
          );
        })}
      </div>
    ) : (
      <Fallback className="h-full" message={fallbackMessages.portfolios} />
    );
  return (
    <Section
      title={`Portfolios (${portfolios.length})`}
      actionButtons={[
        {
          icon: <HiPlus />,
          onClick: () => modalActions.open("ADD_PORTFOLIO"),
        },
      ]}
    >
      {renderPortfolioListItems()}
    </Section>
  );
};

export default PortfolioList;
