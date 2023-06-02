import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getSymbols } from "../../states/stocks.reducer";
import isEmpty from "is-empty";
import { useOutsideClick } from "../../hooks";
import { addInvestment } from "../../utils/api.utils";
import { Portfolio } from "../../types/entity.types";

const getFilteredSymbols = (q: string, symbols: string[]) => {
  // Get symbols that start with a given keyword
  const filteredSymbols: string[] = symbols.filter((symbol: string) =>
    new RegExp(`^${q}`, "i").test(symbol)
  );
  return filteredSymbols.slice(0, 5);
};

interface AddInvestmentProps {
  portfolio: Portfolio;
}

const AddInvestment: FC<AddInvestmentProps> = ({ portfolio }) => {
  const symbols = useSelector((state: RootState) => getSymbols(state));
  const [searchInput, setSearchInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [filteredSymbols, setFilteredSymbols] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const resetForm = () => {
    setSearchInput("");
    setQuantity(1);
    setFilteredSymbols([]);
    setSelectedSymbol("");
  };
  const formRef = useOutsideClick<HTMLFormElement>(resetForm);
  const handleSymbolSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (isEmpty(value)) {
      setFilteredSymbols([]);
      return;
    }
    setSearchInput(value);
    setFilteredSymbols(getFilteredSymbols(e.currentTarget.value, symbols));
  };
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return;
    }
    setQuantity(newQuantity);
  };
  const handleSymbolClick = (symbol: string) => {
    setSearchInput(symbol);
    setSelectedSymbol(symbol);
    setFilteredSymbols([]);
  };
  const renderFilteredSymbols = () => (
    <ul className="menu menu-sm bg-base-200 w-full rounded-box">
      {filteredSymbols.map(symbol => (
        <li key={symbol} onClick={() => handleSymbolClick(symbol)}>
          <a>{symbol}</a>
        </li>
      ))}
    </ul>
  );
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSymbol) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await addInvestment({
        quantity,
        cost: 50,
        userId: "ec6f41ae-9075-49ef-b313-365464f8bc8a",
        stockId: selectedSymbol,
        portfolioId: portfolio.id,
      });
      setIsLoading(false);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="dropdown dropdown-bottom dropdown-end top-[-1px]">
      <label tabIndex={0} className="btn btn-xs btn-outline">
        Add Investment
      </label>
      <div
        tabIndex={0}
        className="dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 z-50"
      >
        <form
          className="flex flex-col gap-2"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label className="label p-0">
            <span className="label-text">Stock symbol</span>
          </label>
          <input
            type="text"
            placeholder="Seach..."
            className="input input-sm input-bordered w-full max-w-xs"
            onChange={handleSymbolSearch}
            value={searchInput}
          />
          {!isEmpty(filteredSymbols) && renderFilteredSymbols()}
          <label className="label p-0">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="number"
            placeholder="Qty"
            min={1}
            className="input input-sm input-bordered w-full max-w-xs"
            onChange={handleQuantityChange}
            value={quantity}
          />
          <button
            className="btn btn-sm btn-primary"
            disabled={isEmpty(selectedSymbol)}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInvestment;
