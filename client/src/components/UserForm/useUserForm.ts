import { ChangeEvent, FormEvent, useState } from "react";
import { createUser, signInUser } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncFetchUser } from "../../states/user.reducer";
import { updateUserId } from "../../states/auth.reducer";

export interface UserFormData {
  username: string;
  email: string;
  password: string;
}

const initialState: UserFormData = {
  username: "",
  email: "",
  password: "",
};

const useUserForm = (
  isSignIn: boolean
): {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
} => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<UserFormData>(initialState);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    // do validation here
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      const userId = await signInUser(formData);
      dispatch(updateUserId(userId));
      dispatch(asyncFetchUser());
    } else {
      const res = await createUser(formData);
      console.log(res);
    }
  };
  return { handleInputChange, handleSubmit };
};

export default useUserForm;
