import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { asyncFetchUser, getUser } from "../store/user.reducer";

const useFetchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => getUser(state));
  const [isFetched, setIsFetched] = useState(false);
  const isSignedIn = !!user.userInfo?.id;
  console.log("isSignedIn", isSignedIn);
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(asyncFetchUser());
      setIsFetched(true);
    };
    fetchUser();
  }, [dispatch]);
  return { isFetched, isSignedIn };
};

export default useFetchUser;
