import { FC, ReactNode } from "react";

export interface GridItemProps {
  title: string;
  text: string | ReactNode;
}

const EntityListGridItem: FC<GridItemProps> = ({ title, text }) => (
  <div className="bg-slate-100 rounded-lg p-2 flex flex-col gap-2">
    <h4 className="text-slate-500 text-sm">{title}</h4>
    <div className="font-bold">{text}</div>
  </div>
);

export default EntityListGridItem;
