import { FC, PropsWithChildren } from "react";

interface SectionProps {
  title: string;
}

const Section: FC<PropsWithChildren<SectionProps>> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default Section;
