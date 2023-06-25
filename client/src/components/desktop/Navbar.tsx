import { Link } from "react-router-dom";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineChartBar,
  HiOutlineCog8Tooth,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import logo from "../../assets/logo.png";
import { BASE_BUTTON_CLASSES } from "../../constants/classes.constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { asyncSignOut } from "../../store/user.reducer";

const NAVBAR_ITEM_ICON_CLASSES = "text-lg";

const Logo = () => (
  <Link
    to="/"
    className="btn btn-ghost btn-link normal-case no-underline text-black hover:no-underline"
  >
    <img className="w-12" src={logo} alt="logo" />
    <span className="text-xl">Stockpile</span>
  </Link>
);

const renderNavbarItems = () => {
  const navbarItems = [
    {
      path: "/",
      text: "Dashboard",
      icon: <HiOutlineSquares2X2 className={NAVBAR_ITEM_ICON_CLASSES} />,
    },
    {
      path: "/portfolios",
      text: "Portfolio",
      icon: <HiOutlineChartBar className={NAVBAR_ITEM_ICON_CLASSES} />,
    },
    {
      path: "/settings",
      text: "Settings",
      icon: <HiOutlineCog8Tooth className={NAVBAR_ITEM_ICON_CLASSES} />,
    },
  ];
  return navbarItems.map(({ path, text, icon }) => (
    <Link
      to={path}
      key={text}
      className={`${BASE_BUTTON_CLASSES.md} justify-start`}
    >
      {icon}
      {text}
    </Link>
  ));
};

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    dispatch(asyncSignOut());
  };
  return (
    <div className="flex flex-col justify-between h-full bg-slate-100 p-16">
      <div className="flex flex-col gap-20">
        <Logo />
        <div className="flex flex-col gap-4">{renderNavbarItems()}</div>
      </div>
      <button
        className={`${BASE_BUTTON_CLASSES.md} justify-start`}
        onClick={handleSignOut}
      >
        <HiOutlineArrowRightOnRectangle className={NAVBAR_ITEM_ICON_CLASSES} />
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
