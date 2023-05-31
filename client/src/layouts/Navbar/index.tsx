import { FC } from "react";
import { Link } from "react-router-dom";
import { NavbarItem } from "./navbar-items";

interface NavbarProps {
  navbarItems: NavbarItem[];
}

const Navbar: FC<NavbarProps> = ({ navbarItems }) => {
  const renderNavbarItems = () =>
    navbarItems.map(navbarItem => (
      <Link
        key={navbarItem.label}
        className="p-4 font-bold"
        to={navbarItem.path}
      >
        {navbarItem.label}
      </Link>
    ));

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
    </div>
  );
};

export default Navbar;
