import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import navbarItems from "./navbar-items";

const BottomNavbarItems: FC = () => {
  const location = useLocation();
  const isNavbarItemActive = (path: string) => path === location.pathname;
  const renderBottomNavbarItems = () =>
    navbarItems.map(({ label, path, icon }) => (
      <Link
        key={label}
        className={`${isNavbarItemActive(path) ? "active" : ""}`}
        to={path}
      >
        {icon}
      </Link>
    ));
  return <div className="btm-nav md:hidden">{renderBottomNavbarItems()}</div>;
};

export default BottomNavbarItems;
