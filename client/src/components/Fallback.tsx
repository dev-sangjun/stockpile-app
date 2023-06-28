import { FC } from "react";
import { useTranslation } from "react-i18next";

interface FallbackProps {
  className?: string;
  message: string;
}

const Fallback: FC<FallbackProps> = ({ className, message }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex justify-center items-center p-8 border-2 border-dashed border-slate-200 rounded-xl ${
        className ? className : ""
      }`}
    >
      <p className="text-lg text-slate-500">{t(message)}</p>
    </div>
  );
};

export default Fallback;
