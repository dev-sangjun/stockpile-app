import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUser } from "../../store/user.reducer";
import Section from "../Section";
import EntityListItem from "../EntityListItem";
import { RootState } from "../../store";
import { getPortfolioTotalValue } from "../../utils/entity.utils";
import { toUSD } from "../../utils/common.utils";
import { ENTITY_LIST_CLASSES } from "../../constants/classes.constants";
import { HiPlus } from "react-icons/hi2";
import useDispatchActions from "../../hooks/useDispatchActions";
import Fallback from "../Fallback";
import { useFallbackMessages } from "../../constants/messages.constants";

const PortfolioList = () => {
  const { portfolioActions, modalActions } = useDispatchActions();
  const { t } = useTranslation();
  const fallbackMessages = useFallbackMessages();
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
              label={{
                title: "Total Balance",
                value: toUSD(totalBalance),
              }}
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
      title={`${t("Portfolios")} (${portfolios.length})`}
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
