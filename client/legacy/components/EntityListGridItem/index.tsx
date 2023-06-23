import { FC, ReactNode } from "react";

export interface GridItemProps {
  className?: string;
  title: string;
  text: string | ReactNode;
}

const EntityListGridItem: FC<GridItemProps> = ({ className, title, text }) => (
  <div
    className={`bg-slate-100 rounded-lg p-3 flex flex-col gap-2 ${
      className ? className : ""
    }`}
  >
    <h4 className="text-slate-500 text-sm">{title}</h4>
    <div className="font-bold text-sm">{text}</div>
  </div>
);

export default EntityListGridItem;
