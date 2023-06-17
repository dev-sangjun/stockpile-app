import { FC } from "react";
import { Link } from "react-router-dom";
import navbarItems from "./navbar-items";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncSignOut } from "../../states/user.reducer";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

const NavbarItems: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => dispatch(asyncSignOut());
  const renderNavbarItems = () => [
    ...navbarItems.map(({ icon, label, path }) => (
      <Link
        key={label}
        className="font-bold mr-8 btn btn-ghost normal-case w-full justify-start gap-4"
        to={path}
      >
        {icon}
        {label}
      </Link>
    )),
  ];
  return (
    <div className="menu menu-vertical h-full pr-4 justify-between items-start gap-3">
      <div className="flex flex-col gap-3">{renderNavbarItems()}</div>
      <button
        className="btn btn-ghost normal-case w-full justify-start gap-4"
        onClick={handleSignOut}
      >
        <HiOutlineArrowRightOnRectangle className="text-lg" />
        Sign out
      </button>
    </div>
  );
};

export default NavbarItems;
