import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronRight } from "react-icons/hi2";

interface EntityListItemProps {
  className?: string;
  title: string;
  label?: {
    title: string;
    value: string;
  };
  icon?: ReactNode;
  onClick?: () => void;
}

const EntityListItem: FC<EntityListItemProps> = ({
  className = "",
  title,
  label,
  icon = <HiChevronRight />,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex items-center p-3 gap-4 bg-base-100 border-b border-slate-100 hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      <h3 className="flex-1 text-sm font-semibold">{title}</h3>
      {label && (
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-500">{t(label.title)}</span>
          <span className="text-sm font-semibold">{label.value}</span>
        </div>
      )}
      {icon}
    </div>
  );
};

export default EntityListItem;
