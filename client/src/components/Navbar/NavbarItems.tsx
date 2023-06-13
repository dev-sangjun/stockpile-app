import { FC } from "react";
import { Link } from "react-router-dom";
import navbarItems from "./navbar-items";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncSignOut } from "../../states/user.reducer";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";

const NavbarItems: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => dispatch(asyncSignOut());
  const renderNavbarItems = () => [
    ...navbarItems.map(({ label, path }) => (
      <Link key={label} className="font-bold mr-8" to={path}>
        {label}
      </Link>
    )),
  ];
  return (
    <div className="menu menu-horizontal pr-4 items-center">
      {renderNavbarItems()}
      <div className="dropdown dropdown-end flex">
        <div tabIndex={0} className="avatar hover:cursor-pointer">
          <div className="w-8 rounded-full border border-slate-500">
            <img src="https://api.dicebear.com/6.x/personas/svg" alt="avatar" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content p-2 shadow-lg bg-base-100 rounded-box mt-12"
        >
          <li>
            <Link to="/settings">
              <HiOutlineCog8Tooth />
              Settings
            </Link>
          </li>
          <li onClick={handleSignOut}>
            <span>
              <HiOutlineArrowRightOnRectangle />
              Sign out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarItems;
