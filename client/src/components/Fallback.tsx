import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface FallbackProps {
  className?: string;
  message: string;
  redirectTo?: string;
}

const Fallback: FC<FallbackProps> = ({
  className = "",
  message,
  redirectTo,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex justify-center items-center p-4 md:p-8 border-2 border-dashed border-slate-200 rounded-xl ${className}`}
    >
      {redirectTo ? (
        <Link to={redirectTo}>
          <p className="text-sm md:text-lg text-slate-500">{t(message)}</p>
        </Link>
      ) : (
        <p className="text-sm md:text-lg text-slate-500">{t(message)}</p>
      )}
    </div>
  );
};

export default Fallback;
