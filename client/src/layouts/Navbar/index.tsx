import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarItem } from "./navbar-items";
import logo from "../../assets/logo.png";
import { signOutUser } from "../../api/auth.api";

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
  const handleSignOut = async () => {
    await signOutUser();
  };
  return (
    <div className="bg-white absolute w-full">
      <div className="navbar p-0 max-w-7xl mx-auto sticky top-0 z-10">
        <div className="flex-1 top-0">
          <Link
            className="btn btn-ghost normal-case text-xl mx-auto md:mx-0 flex gap-2"
            to="/"
          >
            <img src={logo} alt="logo" className="w-12" />
            <span>Stockpile</span>
          </Link>
        </div>
        <div className="hidden md:flex">
          <div className="flex-none">
            <ul className="menu menu-horizontal">{renderNavbarItems()}</ul>
          </div>
          <button className="btn btn-ghost" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
        <div className="btm-nav md:hidden">{renderBottomNavbarItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
