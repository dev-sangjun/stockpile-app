import { useSelector } from "react-redux";
import { getUser } from "../../../store/user.reducer";
import Section from "../../common/Section";
import EntityListItem from "../EntityListItem";
import { RootState } from "../../../store";
import { getPortfolioTotalValue } from "../../../utils/entity.utils";
import { toUSD } from "../../../utils/common.utils";

const PortfolioList = () => {
  const { portfolios, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  const renderPortfolioListItems = () => (
    <div className="flex flex-col h-full bg-slate-100 border rounded-xl overflow-y-auto">
      {portfolios.map(portfolio => {
        const totalBalance = getPortfolioTotalValue(portfolio, stocks);
        return (
          <EntityListItem
            className="bg-base-100 border-b hover:cursor-pointer"
            title={portfolio.name}
            labelTitle="Total Balance"
            labelValue={toUSD(totalBalance)}
          />
        );
      })}
    </div>
  );
  return <Section title="Portfolios">{renderPortfolioListItems()}</Section>;
};

export default PortfolioList;
