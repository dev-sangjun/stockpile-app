import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getUser } from "../../states/user.reducer";

const useUserState = () => {
  const user = useSelector((state: RootState) => getUser(state));
  return {
    stocks: user.stocks,
    selectedPortfolio: user.selectedPortfolio,
  };
};

export default useUserState;
