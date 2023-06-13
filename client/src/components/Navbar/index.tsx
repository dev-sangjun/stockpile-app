import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavbarItems from "./NavbarItems";
import BottomNavbarItems from "./BottomNavbarItems";

const Navbar: FC = () => {
  return (
    <div className="bg-white absolute w-full z-10">
      <div className="navbar p-0 max-w-7xl mx-auto pr-4">
        <div className="flex-1 top-0">
          <Link
            className="btn btn-link btn-ghost normal-case no-underline text-black text-xl mx-auto md:mx-0 flex gap-2 hover:no-underline"
            to="/"
          >
            <img src={logo} alt="logo" className="w-12" />
            <span>Stockpile</span>
          </Link>
        </div>
        <div className="hidden md:flex">
          <div className="flex-none">
            <NavbarItems />
          </div>
        </div>
        <BottomNavbarItems />
      </div>
    </div>
  );
};

export default Navbar;
