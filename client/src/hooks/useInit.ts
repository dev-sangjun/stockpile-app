import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useDispatchActions from "./useDispatchActions";
import { useFetchUser } from ".";
import { getSymbols } from "../store/stocks.reducer";
import isEmpty from "is-empty";

const useInit = () => {
  const { stockActions } = useDispatchActions();
  const { isFetched, isSignedIn } = useFetchUser();
  const symbols = useSelector((state: RootState) => getSymbols(state));
  useEffect(() => {
    if (isEmpty(symbols)) {
      stockActions.fetchSymbols();
    }
  }, [stockActions, symbols]);
  return { isFetched, isSignedIn };
};

export default useInit;
