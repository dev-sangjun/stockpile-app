import isEmpty from "is-empty";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncFetchPortfolios } from "../../states/portfolios.reducer";
import { TEST_USER_ID } from "../../dev/constants";
import { addPortfolio } from "../../api/portfolio.api";

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
    if (isEmpty(name)) {
      return;
    }
    try {
      // add portfolio
      await addPortfolio({ name, userId: TEST_USER_ID });
      dispatch(asyncFetchPortfolios(TEST_USER_ID));
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
