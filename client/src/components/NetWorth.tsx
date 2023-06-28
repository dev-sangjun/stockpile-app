import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getTotalNetWorth } from "../utils/entity.utils";
import { toUSD } from "../utils/common.utils";
import { RootState } from "../store";
import { getUser } from "../store/user.reducer";

const NetWorth = () => {
  const { t } = useTranslation();
  const { investments, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold">{t("Net Worth")}</h3>
      <div className="flex-1 flex flex-row items-center">
        <span className="text-2xl font-bold text-primary">
          {toUSD(getTotalNetWorth(Object.values(investments), stocks))}
        </span>
      </div>
    </div>
  );
};

export default NetWorth;
