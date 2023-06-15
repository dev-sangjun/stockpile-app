import { FC } from "react";

interface FallbackProps {
  className?: string;
  message: string;
}

const Fallback: FC<FallbackProps> = ({ className, message }) => {
  return (
    <div
      className={`h-full flex justify-center items-center p-8 border-2 border-dashed border-slate-500 rounded-xl ${
        className ? className : ""
      }`}
    >
      <p className="text-lg text-slate-500 font-bold">{message}</p>
    </div>
  );
};

export default Fallback;
