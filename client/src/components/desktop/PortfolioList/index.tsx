import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/user.reducer";
import Section from "../../common/Section";
import EntityListItem from "../EntityListItem";
import { AppDispatch, RootState } from "../../../store";
import { getPortfolioTotalValue } from "../../../utils/entity.utils";
import { toUSD } from "../../../utils/common.utils";
import { selectPortfolio } from "../../../store/entity.reducer";
import { ENTITY_LIST_CLASSES } from "../../../constants/classes.constants";

const PortfolioList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { portfolios, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  const renderPortfolioListItems = () => (
    <div className={`${ENTITY_LIST_CLASSES} h-full`}>
      {portfolios.map(portfolio => {
        const totalBalance = getPortfolioTotalValue(portfolio, stocks);
        return (
          <EntityListItem
            key={portfolio.id}
            title={portfolio.name}
            labelTitle="Total Balance"
            labelValue={toUSD(totalBalance)}
            onClick={() => dispatch(selectPortfolio(portfolio))}
          />
        );
      })}
    </div>
  );
  return (
    <Section title={`Portfolios (${portfolios.length})`}>
      {renderPortfolioListItems()}
    </Section>
  );
};

export default PortfolioList;
