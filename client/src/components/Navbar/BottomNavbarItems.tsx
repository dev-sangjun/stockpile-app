import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import navbarItems from "./navbar-items";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncSignOut } from "../../states/user.reducer";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

const BottomNavbarItems: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      dispatch(asyncSignOut());
    }
  };
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
  return (
    <div className="btm-nav md:hidden">
      {renderBottomNavbarItems()}
      <div onClick={handleSignOut}>
        <HiOutlineArrowRightOnRectangle className="text-lg" />
      </div>
    </div>
  );
};

export default BottomNavbarItems;
