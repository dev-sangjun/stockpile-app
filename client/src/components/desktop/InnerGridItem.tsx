import { FC, ReactNode } from "react";

export interface InnerGridItemProps {
  title: string;
  value: ReactNode | string;
}

const InnerGridItem: FC<InnerGridItemProps> = ({ title, value }) => {
  return (
    <div className="card bg-slate-100 p-4 gap-2 text-sm">
      <h3 className="text-slate-500">{title}</h3>
      <div className="font-semibold">{value}</div>
    </div>
  );
};

export default InnerGridItem;
