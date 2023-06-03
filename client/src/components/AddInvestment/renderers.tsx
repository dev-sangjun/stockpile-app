import { FormData } from ".";

export const renderFilteredSymbols = (
  formData: FormData,
  handleSymbolClick: (symbol: string) => void
) => (
  <ul className="menu menu-sm bg-base-200 w-full rounded-box">
    {formData.filteredSymbols.map(symbol => (
      <li key={symbol} onClick={() => handleSymbolClick(symbol)}>
        <a>{symbol}</a>
      </li>
    ))}
  </ul>
);
