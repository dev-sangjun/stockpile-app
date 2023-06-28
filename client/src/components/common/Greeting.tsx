import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { RootState } from "../../store";
import { getUser } from "../../store/user.reducer";
import emojis from "../../constants/emoji.constants";

const Greeting = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state: RootState) => getUser(state));
  if (!userInfo) {
    return null;
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {t("Hello", { username: userInfo.username })} {emojis.handWave}
        </h2>
        <p className="text-sm text-slate-500">
          {t("We'll help you reach your financial goal!")} {emojis.moneyBag}
        </p>
      </div>
      <div className="hidden md:block text-sm font-normal text-slate-500">
        {t("Today is", { date: moment().format("MM-DD-YYYY") })}
      </div>
    </div>
  );
};

export default Greeting;
