import { FC } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronRight } from "react-icons/hi2";

interface EntityListItemProps {
  title: string;
  labelTitle: string;
  labelValue: string;
  showRightArrowIcon?: boolean;
  onClick?: () => void;
}

const EntityListItem: FC<EntityListItemProps> = ({
  title,
  labelTitle,
  labelValue,
  showRightArrowIcon = true,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="flex items-center p-3 gap-4 bg-base-100 border-b border-slate-100 hover:cursor-pointer"
      onClick={onClick}
    >
      <h3 className="flex-1 text-sm font-semibold">{title}</h3>
      <div className="flex flex-col items-end">
        <span className="text-xs text-slate-500">{t(labelTitle)}</span>
        <span className="text-sm font-semibold">{labelValue}</span>
      </div>
      {showRightArrowIcon && <HiChevronRight />}
    </div>
  );
};

export default EntityListItem;
