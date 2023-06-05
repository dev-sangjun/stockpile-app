import isEmpty from "is-empty";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { TEST_USER_ID } from "../../dev/constants";
import { getSymbols } from "../../states/stocks.reducer";
import { addInvestmentToPortfolio } from "../../api/portfolio.api";
import {
  asyncFetchUser,
  getSelectedPortfolio,
  getStocks,
} from "../../states/user.reducer";

export interface AddInvestmentFormData {
  keyword: string;
  quantity: number;
  cost: number | undefined;
  filteredSymbols: string[];
  selectedSymbol: string;
}

const formDataInitialState: AddInvestmentFormData = {
  keyword: "",
  quantity: 1,
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

const useAddInvestmentForm = (): {
  formData: AddInvestmentFormData;
  setFormData: Dispatch<React.SetStateAction<AddInvestmentFormData>>;
  resetFormData: () => void;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
} => {
  const [formData, setFormData] =
    useState<AddInvestmentFormData>(formDataInitialState);
  const dispatch = useDispatch<AppDispatch>();
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
      const quantity = parseInt(value);
      if (isNaN(quantity) || quantity < 1) {
        return;
      }
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
    if (!selectedSymbol || !selectedPortfolio) {
      return;
    }
    try {
      // add investment -> fetch stocks owned by the user -> fetch portfolios
      await addInvestmentToPortfolio({
        quantity,
        cost,
        userId: TEST_USER_ID,
        stockId: selectedSymbol,
        portfolioId: selectedPortfolio.id,
      });
      dispatch(asyncFetchUser(TEST_USER_ID));
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
