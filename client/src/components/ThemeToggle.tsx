import { FC, useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
const ThemeToggle: FC = () => {
  const [isLight, setIsLight] = useState(true);
  const handleClick = () => {
    setIsLight(prev => !prev);
  };
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      const theme = isLight ? "light" : "dark";
      html.setAttribute("data-theme", theme);
    }
  }, [isLight]);
  return (
    <button
      className="btn btn-ghost btn-link text-xl pr-0"
      onClick={handleClick}
    >
      {isLight ? <HiOutlineSun /> : <HiOutlineMoon />}
    </button>
  );
};

export default ThemeToggle;
