import i18next, { changeLanguage } from "i18next";
import { BASE_BUTTON_CLASSES } from "../constants/classes.constants";
import { FC, useEffect, useState } from "react";

interface LanguageButton {
  fullText: string;
  shortText: string;
  lang: string;
}

interface LanguageSelectProps {
  className?: string;
  isMobile: boolean;
}

const LanguageSelect: FC<LanguageSelectProps> = ({
  className = "",
  isMobile,
}) => {
  const [language, setLanguage] = useState(i18next.language || "en");
  const handleClick = (lang: string) => {
    changeLanguage(lang);
    setLanguage(lang);
  };
  useEffect(() => {
    setLanguage(i18next.language);
  }, [setLanguage]);
  const renderButtons = () => {
    const buttons: LanguageButton[] = [
      {
        fullText: "English",
        shortText: "A",
        lang: "en-US",
      },
      {
        fullText: "한국어",
        shortText: "가",
        lang: "kr",
      },
    ];
    return buttons.map(({ fullText, shortText, lang }) => (
      <button
        key={lang}
        className={`${BASE_BUTTON_CLASSES.xs} ${
          lang === language
            ? "text-black font-bold underline"
            : "text-slate-500 font-light"
        } px-2 py-0`}
        onClick={() => handleClick(lang)}
      >
        {isMobile ? shortText : fullText}
      </button>
    ));
  };
  return <div className={`flex ${className}`}>{renderButtons()}</div>;
};

export default LanguageSelect;
