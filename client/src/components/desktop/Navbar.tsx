import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineChartBar,
  HiOutlineCog8Tooth,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import logo from "../../assets/logo.png";
import { BASE_BUTTON_CLASSES } from "../../constants/classes.constants";
import useDispatchActions from "../../hooks/useDispatchActions";

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

const Navbar = () => {
  const { authActions } = useDispatchActions();
  const { t } = useTranslation();
  const renderNavbarItems = () => {
    const navbarItems = [
      {
        path: "/",
        text: t("Dashboard"),
        icon: <HiOutlineSquares2X2 className={NAVBAR_ITEM_ICON_CLASSES} />,
      },
      {
        path: "/portfolios",
        text: t("Portfolios"),
        icon: <HiOutlineChartBar className={NAVBAR_ITEM_ICON_CLASSES} />,
      },
      {
        path: "/settings",
        text: t("Settings"),
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
  return (
    <div className="flex flex-col justify-between border-r h-full px-8 py-16">
      <div className="flex flex-col gap-20">
        <Logo />
        <div className="flex flex-col gap-4">{renderNavbarItems()}</div>
      </div>
      <button
        className={`${BASE_BUTTON_CLASSES.md} justify-start`}
        onClick={authActions.signOut}
      >
        <HiOutlineArrowRightOnRectangle className={NAVBAR_ITEM_ICON_CLASSES} />
        {t("Sign out")}
      </button>
    </div>
  );
};

export default Navbar;
