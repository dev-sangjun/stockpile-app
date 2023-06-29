import { FC } from "react";
import { useLocation } from "react-router-dom";
import { BASE_BUTTON_CLASSES } from "../../constants/classes.constants";
import { NavbarItem } from ".";
import { Link } from "react-router-dom";

interface BottomNavbarProps {
  navbarItems: NavbarItem[];
}

const BottomNavbar: FC<BottomNavbarProps> = ({ navbarItems }) => {
  const location = useLocation();
  const renderBottomNavbarItems = () => {
    const isNavbarItemActive = (path?: string) => path === location.pathname;
    return navbarItems.map(({ path, text, icon, onClick }) =>
      path ? (
        <Link
          key={text}
          className={`border-t-2 border-slate-100 ${
            isNavbarItemActive(path) ? "active border-black" : ""
          }`}
          to={path}
        >
          {icon}
        </Link>
      ) : (
        <div key={text} className="border-t-2 border-slate-100">
          <button className={BASE_BUTTON_CLASSES.sm} onClick={onClick}>
            {icon}
          </button>
        </div>
      )
    );
  };
  return (
    <div className="navbar bg-base-100 p-0 mx-auto border-t">
      <div className="btm-nav z-10 h-[4.5rem] pb-2">
        {renderBottomNavbarItems()}
      </div>
    </div>
  );
};

export default BottomNavbar;
