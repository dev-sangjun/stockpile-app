import { FC, PropsWithChildren, ReactNode } from "react";
import { BASE_BUTTON_CLASSES } from "../../constants/classes.constants";
import { HiChevronLeft } from "react-icons/hi2";

export interface SectionActionButton {
  icon: ReactNode;
  onClick: () => void;
}

interface SectionProps {
  title: string;
  backButton?: {
    text: string;
    onClick: () => void;
  };
  actionButtons?: SectionActionButton[];
}

const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  backButton,
  actionButtons,
  children,
}) => {
  return (
    <div className="relative h-full flex flex-col gap-2">
      {backButton && (
        <button
          className={`${BASE_BUTTON_CLASSES.sm} absolute gap-2 text-slate-500`}
          onClick={backButton.onClick}
        >
          <HiChevronLeft />
          {backButton.text}
        </button>
      )}
      <h2
        className={`text-xl font-semibold ${backButton ? "text-center" : ""}`}
      >
        {title}
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
