import { FC } from "react";
import { HiChevronRight } from "react-icons/hi2";

interface EntityListItemProps {
  className?: string;
  title: string;
  labelTitle: string;
  labelValue: string;
  showRightArrowIcon?: boolean;
}

const EntityListItem: FC<EntityListItemProps> = ({
  className,
  title,
  labelTitle,
  labelValue,
  showRightArrowIcon = true,
}) => {
  return (
    <div className={`flex items-center p-3 gap-4 ${className}`}>
      <h3 className="flex-1 text-sm font-semibold">{title}</h3>
      <div className="flex flex-col items-end">
        <span className="text-xs text-slate-500">{labelTitle}</span>
        <span className="text-sm font-semibold">{labelValue}</span>
      </div>
      {showRightArrowIcon && <HiChevronRight />}
    </div>
  );
};

export default EntityListItem;
