import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store";
import { asyncFetchUser, getUserId } from "../states/user.reducer";
import { asyncFetchSymbols } from "../states/stocks.reducer";

const useLoadPage = (): { isLoaded: boolean; isSignedIn: boolean } => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => getUserId(state));
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchStates = async () => {
      await dispatch(asyncFetchSymbols());
      await dispatch(asyncFetchUser());
      setIsLoaded(true);
    };
    fetchStates();
  }, [dispatch, userId]);
  return { isLoaded, isSignedIn: !!userId };
};

export default useLoadPage;
