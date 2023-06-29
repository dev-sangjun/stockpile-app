import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { RootState } from "../store";
import { getUser } from "../store/user.reducer";
import emojis from "../constants/emoji.constants";
import { HiArrowPath } from "react-icons/hi2";
import { LINK_BUTTON_CLASSES } from "../constants/classes.constants";

const Greeting = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state: RootState) => getUser(state));
  if (!userInfo) {
    return null;
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between md:justify-start items-center gap-2 w-full md:w-fit max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {t("Hello", { username: userInfo.username })} {emojis.handWave}
          </h2>
          <button className={`${LINK_BUTTON_CLASSES.sm} text-lg`}>
            <HiArrowPath />
          </button>
        </div>
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
