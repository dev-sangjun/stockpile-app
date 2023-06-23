import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavbarItems from "./NavbarItems";
import BottomNavbarItems from "./BottomNavbarItems";

const Navbar: FC = () => {
  return (
    <div className="bg-base-100 absolute md:h-full w-screen md:w-64 z-10 p-2 md:px-2 md:py-16 flex flex-col gap-16 md:border md:border-base-300">
      <Link
        className="btn btn-link btn-ghost normal-case no-underline text-black text-xl mx-auto md:mx-0 flex gap-2 hover:no-underline md:justify-start w-fit"
        to="/"
      >
        <img src={logo} alt="logo" className="w-12" />
        <span>Stockpile</span>
      </Link>
      <div className="hidden md:flex md:flex-col md:flex-1">
        <NavbarItems />
      </div>
      <BottomNavbarItems />
    </div>
  );
};

export default Navbar;
