import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUser } from "../store/user.reducer";
import useDispatchActions from "./useDispatchActions";

const useFetchUser = () => {
  const { userActions } = useDispatchActions();
  const user = useSelector((state: RootState) => getUser(state));
  const [isFetched, setIsFetched] = useState(false);
  const isSignedIn = !!user.userInfo?.id;
  useEffect(() => {
    const fetchUser = async () => {
      await userActions.fetch();
      setIsFetched(true);
    };
    if (!isSignedIn) {
      fetchUser();
    }
  }, [userActions, isSignedIn]);
  return { isFetched, isSignedIn };
};

export default useFetchUser;
