import isEmpty from "is-empty";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { FormData } from ".";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { addInvestment } from "../../utils/api.utils";
import {
  asyncFetchPortfolios,
  getSelectedPortfolio,
} from "../../states/portfolios.reducer";
import { TEST_USER_ID } from "../../dev/constants";
import { asyncFetchStocks, getStocks } from "../../states/stocks.reducer";

const formDataInitialState: FormData = {
  keyword: "",
  quantity: 1,
  price: undefined,
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
  symbols: string[]
): [
  FormData,
  Dispatch<React.SetStateAction<FormData>>,
  () => void,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: FormEvent) => Promise<void>
] => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const dispatch = useDispatch<AppDispatch>();
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const stocks = useSelector((state: RootState) => getStocks(state));
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
    } else if (name === "price") {
      const price = parseFloat(value);
      if (isNaN(price) || price < 0) {
        return;
      }
      if (price === 0) {
        const currentPrice = stocks?.[formData.selectedSymbol]?.c || price;
        setFormData({ ...formData, price: currentPrice });
        return;
      }
      setFormData({ ...formData });
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
    if (!formData.selectedSymbol || !selectedPortfolio) {
      return;
    }
    const { quantity, price, selectedSymbol } = formData;
    try {
      // add investment -> fetch stocks owned by the user -> fetch portfolios
      await addInvestment({
        quantity,
        cost: price,
        userId: TEST_USER_ID,
        stockId: selectedSymbol,
        portfolioId: selectedPortfolio.id,
      });
      dispatch(asyncFetchStocks(TEST_USER_ID)).then(() =>
        dispatch(asyncFetchPortfolios(TEST_USER_ID))
      );
    } catch (e) {
      console.error(e);
    }
  };
  return [formData, setFormData, resetFormData, handleFormChange, handleSubmit];
};

export default useAddInvestmentForm;
