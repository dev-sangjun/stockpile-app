import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { getTotalNetWorth } from "../utils/entity.utils";
import { toUSD } from "../utils/common.utils";
import { RootState } from "../store";
import { getUser } from "../store/user.reducer";
import { BASE_BUTTON_CLASSES } from "../constants/classes.constants";

const NetWorth = () => {
  const { t } = useTranslation();
  const { investments, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  return (
    <div className="flex flex-col md:gap-1">
      <div className="flex justify-between items-center">
        <h3 className="md:text-lg font-semibold">{t("Net Worth")}</h3>
        <Link
          className={`${BASE_BUTTON_CLASSES.sm} btn-link p-0 no-underline hover:no-underline text-black`}
          to="/settings"
        >
          <HiOutlineCog8Tooth />
        </Link>
      </div>
      <div className="flex-1 flex flex-row items-center">
        <span className="text-xl md:text-2xl font-bold text-primary">
          {toUSD(getTotalNetWorth(Object.values(investments), stocks))}
        </span>
      </div>
    </div>
  );
};

export default NetWorth;
