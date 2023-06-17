import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { getUserInfo } from "../states/user.reducer";
import moment from "moment";

const Greeting: FC = () => {
  const userInfo = useSelector((state: RootState) => getUserInfo(state));
  if (!userInfo) {
    return null;
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-medium">Hello, {userInfo.username} 👋</h2>
        <p className="text-sm text-slate-500">
          We'll help you with tracking and reaching your financial goal! 💰
        </p>
      </div>
      <div className="text-sm font-medium text-slate-500">
        {moment().format("MMM Do, YYYY")}
      </div>
    </div>
  );
};

export default Greeting;
