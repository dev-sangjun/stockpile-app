import { FC } from "react";
import { Link } from "react-router-dom";
import navbarItems from "./navbar-items";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncSignOut } from "../../states/user.reducer";

const NavbarItems: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => dispatch(asyncSignOut);
  const renderNavbarItems = () => [
    ...navbarItems.map(({ label, path }) => (
      <Link key={label} className="p-4 font-bold" to={path}>
        {label}
      </Link>
    )),
    <button className="btn btn-ghost" onClick={handleSignOut}>
      Sign out
    </button>,
  ];
  return <div className="menu menu-horizontal">{renderNavbarItems()}</div>;
};

export default NavbarItems;
