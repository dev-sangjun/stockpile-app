import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export interface InnerGridItemProps {
  className?: string;
  title: string;
  value: ReactNode | string;
}

const InnerGridItem: FC<InnerGridItemProps> = ({ className, title, value }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`bg-slate-100 rounded-xl p-4 gap-2 text-sm ${
        className ? className : ""
      }`}
    >
      <h3 className="text-slate-500">{t(title)}</h3>
      <div className="font-semibold">{value}</div>
    </div>
  );
};

export default InnerGridItem;
