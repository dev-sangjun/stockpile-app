import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "is-empty";
import { AppDispatch, RootState } from "../../../states/store";
import { getSymbols } from "../../../states/stocks.reducer";
import { addInvestmentToPortfolio } from "../../../api/portfolio.api";
import {
  asyncFetchUser,
  getSelectedPortfolio,
  getStocks,
} from "../../../states/user.reducer";
import { getUserId } from "../../../states/user.reducer";
import { notify } from "../../../utils/toast.utils";

export interface AddInvestmentFormData {
  keyword: string;
  quantity: number | undefined;
  cost: number | undefined;
  filteredSymbols: string[];
  selectedSymbol: string;
}

const formDataInitialState: AddInvestmentFormData = {
  keyword: "",
  quantity: undefined,
  cost: undefined,
  filteredSymbols: [],
  selectedSymbol: "",
};

const getFilteredSymbols = (q: string, symbols: string[]) => {
  // Get symbols that start with a given keyword
  const filteredSymbols: string[] = symbols.filter((symbol: string) =>
    new RegExp(`^${q}`, "i").test(symbol)
  );
  return filteredSymbols.slice(0, 5);
};

const useAddInvestmentForm = (
  submitCallback?: () => void
): {
  formData: AddInvestmentFormData;
  setFormData: Dispatch<React.SetStateAction<AddInvestmentFormData>>;
  resetFormData: () => void;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
} => {
  const [formData, setFormData] =
    useState<AddInvestmentFormData>(formDataInitialState);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => getUserId(state));
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const stocks = useSelector((state: RootState) => getStocks(state));
  const symbols = useSelector((state: RootState) => getSymbols(state));
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "keyword") {
      if (isEmpty(value)) {
        setFormData({ ...formData, keyword: value, filteredSymbols: [] });
        return;
      }
      // update filteredSymbols with new keyword
      setFormData({
        ...formData,
        keyword: value,
        filteredSymbols: getFilteredSymbols(value, symbols),
      });
    } else if (name === "quantity") {
      const quantity = parseFloat(value);
      setFormData({ ...formData, quantity });
    } else if (name === "cost") {
      const cost = parseFloat(value);
      if (isNaN(cost) || cost < 0) {
        return;
      }
      if (cost === 0) {
        const currentCost = stocks?.[formData.selectedSymbol]?.c || cost;
        setFormData({ ...formData, cost: currentCost });
        return;
      }
      setFormData({ ...formData, cost });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const resetFormData = () => {
    setFormData(formDataInitialState);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { quantity, cost, selectedSymbol } = formData;
    if (!userId || !selectedSymbol || !selectedPortfolio || !quantity) {
      return;
    }
    try {
      // add investment -> refetch user
      await addInvestmentToPortfolio({
        quantity,
        cost,
        stockId: selectedSymbol,
        portfolioId: selectedPortfolio.id,
      });
      dispatch(asyncFetchUser());
      notify(`Successfully added ${selectedSymbol}`);
      if (submitCallback) {
        submitCallback();
      }
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

export default useAddInvestmentForm;
