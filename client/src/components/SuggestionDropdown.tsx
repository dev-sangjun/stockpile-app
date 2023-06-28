import { ChangeEvent, FC, useState } from "react";
import isEmpty from "is-empty";
import { BASE_INPUT_CLASSES } from "../constants/classes.constants";

interface SuggestionDropdownProps {
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  options: string[];
  limit?: number;
  handleSuggestionClick?: (suggestion: string) => void;
}

const getSuggestions = (q: string, symbols: string[], limit: number) => {
  // Get symbols that start with a given keyword
  const filteredSymbols: string[] = symbols.filter((symbol: string) =>
    new RegExp(`^${q}`, "i").test(symbol)
  );
  return filteredSymbols.slice(0, limit);
};

const SuggestionDropdown: FC<SuggestionDropdownProps> = ({
  defaultValue = "",
  placeholder,
  readOnly = true,
  options,
  limit = 5,
  handleSuggestionClick,
}) => {
  const [keyword, setKeyword] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setKeyword(e.currentTarget.value);
    if (value === "") {
      setSuggestions([]);
      return;
    }
    setSuggestions(getSuggestions(e.currentTarget.value, options, limit));
  };
  const renderSuggestions = () => {
    const handleClick = (suggestion: string) => {
      setKeyword(suggestion);
      setSuggestions([]);
      if (handleSuggestionClick) {
        handleSuggestionClick(suggestion);
      }
    };
    return (
      <ul className="menu menu-sm bg-slate-100 w-full rounded-box">
        {suggestions.map(suggestion => (
          <li key={suggestion} onClick={() => handleClick(suggestion)}>
            <a>{suggestion}</a>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="flex flex-col gap-2">
      <input
        className={BASE_INPUT_CLASSES.sm}
        type="text"
        placeholder={placeholder}
        readOnly={readOnly}
        value={keyword}
        onChange={handleChange}
      />
      {!isEmpty(suggestions) && renderSuggestions()}
    </div>
  );
};

export default SuggestionDropdown;
