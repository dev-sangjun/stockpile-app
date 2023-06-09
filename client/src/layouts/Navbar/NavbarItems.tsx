import { FC } from "react";
import { Link } from "react-router-dom";
import navbarItems from "./navbar-items";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncSignOut } from "../../states/user.reducer";

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
    <div className="menu menu-horizontal pr-4">
      {renderNavbarItems()}
      <span className="font-bold hover:cursor-pointer" onClick={handleSignOut}>
        Sign out
      </span>
    </div>
  );
};

export default NavbarItems;
