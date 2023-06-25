import { FC, PropsWithChildren } from "react";
import { BASE_BUTTON_CLASSES } from "../../constants/classes.constants";
import { HiChevronLeft } from "react-icons/hi2";

interface SectionProps {
  title: string;
  backButton?: {
    text: string;
    onClick: () => void;
  };
}

const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  backButton,
  children,
}) => {
  return (
    <div className="h-full flex flex-col gap-2">
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
      {children}
    </div>
  );
};

export default Section;
