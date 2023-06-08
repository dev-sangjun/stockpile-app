import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "../../api/auth.api";

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

const useUserForm = (): {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
} => {
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
    const res = await createUser(formData);
    console.log(res);
  };
  return { handleInputChange, handleSubmit };
};

export default useUserForm;
