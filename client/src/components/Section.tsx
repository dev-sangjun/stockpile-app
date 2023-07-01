import { FC, PropsWithChildren, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronLeft } from "react-icons/hi2";
import {
  BASE_BUTTON_CLASSES,
  LINK_BUTTON_CLASSES,
} from "../constants/classes.constants";

export interface SectionActionButton {
  icon: ReactNode;
  onClick: () => void;
}

interface SectionProps {
  className?: string;
  title: string;
  backButton?: {
    text: string;
    onClick: () => void;
  };
  actionButtons?: SectionActionButton[];
}

const Section: FC<PropsWithChildren<SectionProps>> = ({
  className = "",
  title,
  backButton,
  actionButtons,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`relative flex flex-col gap-2 ${className}`}>
      {backButton && (
        <button
          className={`${LINK_BUTTON_CLASSES.sm} absolute`}
          onClick={backButton.onClick}
        >
          <HiChevronLeft />
          {t(backButton.text)}
        </button>
      )}
      <h2
        className={`text-lg md:text-xl font-semibold ${
          backButton ? "text-center" : ""
        }`}
      >
        {t(title)}
      </h2>
      {actionButtons && (
        <div className="absolute right-0 flex">
          {actionButtons.map(({ icon, onClick }, idx) => (
            <button
              key={idx}
              className={BASE_BUTTON_CLASSES.sm}
              onClick={onClick}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

export default Section;
