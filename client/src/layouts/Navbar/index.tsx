import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarItem } from "./navbar-items";

interface NavbarProps {
  navbarItems: NavbarItem[];
}

const Navbar: FC<NavbarProps> = ({ navbarItems }) => {
  const location = useLocation();
  const renderNavbarItems = () =>
    navbarItems.map(({ label, path }) => (
      <Link key={label} className="p-4 font-bold" to={path}>
        {label}
      </Link>
    ));
  const renderBottomNavbarItems = () => {
    const isNavbarItemActive = (path: string) => path === location.pathname;
    return navbarItems.map(({ label, path, icon }) => (
      <Link
        key={label}
        className={`${isNavbarItemActive(path) ? "active" : ""}`}
        to={path}
      >
        {icon}
      </Link>
    ));
  };
  return (
    <div className="navbar bg-base-100 p-0 max-w-7xl mx-auto">
      <div className="flex-1">
        <Link
          className="btn btn-ghost normal-case text-xl mx-auto md:mx-0 flex gap-2"
          to="/"
        >
          <span>Stockpile</span>
        </Link>
      </div>
      <div className="hidden md:flex">
        <div className="flex-none">
          <ul className="menu menu-horizontal">{renderNavbarItems()}</ul>
        </div>
      </div>
      <div className="btm-nav md:hidden">{renderBottomNavbarItems()}</div>
    </div>
  );
};

export default Navbar;
