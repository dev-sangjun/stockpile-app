import { FC } from "react";

interface FallbackProps {
  className?: string;
  message: string;
}

const Fallback: FC<FallbackProps> = ({ className, message }) => {
  return (
    <div
      className={`h-full flex justify-center items-center p-8 border-2 border-dashed border-slate-200 rounded-xl ${
        className ? className : ""
      }`}
    >
      <p className="text-lg text-slate-500">{message}</p>
    </div>
  );
};

export default Fallback;
