import isEmpty from "is-empty";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { addPortfolio } from "../../api/portfolio.api";
import { asyncFetchUser } from "../../states/user.reducer";
import { getUserId } from "../../states/user.reducer";

export interface AddPortfolioFormData {
  name: string;
}

const formDataInitialState: AddPortfolioFormData = {
  name: "",
};

const useAddPortfolioForm = (): {
  formData: AddPortfolioFormData;
  setFormData: Dispatch<React.SetStateAction<AddPortfolioFormData>>;
  resetFormData: () => void;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
} => {
  const [formData, setFormData] =
    useState<AddPortfolioFormData>(formDataInitialState);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => getUserId(state));
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const resetFormData = () => {
    setFormData(formDataInitialState);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name } = formData;
    if (!userId || isEmpty(name)) {
      return;
    }
    try {
      // add portfolio
      await addPortfolio({ name });
      dispatch(asyncFetchUser());
    } catch (e) {
      console.error(e);
    }
  };
  return {
    formData,
    setFormData,
    resetFormData,
    handleFormChange,
    handleSubmit,
  };
};

export default useAddPortfolioForm;
