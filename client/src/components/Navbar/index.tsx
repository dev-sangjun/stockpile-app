import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineChartBar,
  HiOutlineCog8Tooth,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import useDispatchActions from "../../hooks/useDispatchActions";
import SideNavbar from "./SideNavbar";
import BottomNavbar from "./BottomNavbar";

const NAVBAR_ITEM_ICON_CLASSES = "text-lg";

export interface NavbarItem {
  path?: string;
  text: string;
  icon: ReactNode;
  onClick?: () => void;
}

const Navbar = () => {
  const { authActions } = useDispatchActions();
  const { t } = useTranslation();
  const navbarItems: NavbarItem[] = [
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
    {
      text: t("Sign out"),
      icon: (
        <HiOutlineArrowRightOnRectangle className={NAVBAR_ITEM_ICON_CLASSES} />
      ),
      onClick: authActions.signOut,
    },
  ];
  return (
    <>
      <div className="md:hidden">
        <BottomNavbar navbarItems={navbarItems} />
      </div>
      <div className="hidden md:block">
        <SideNavbar navbarItems={navbarItems} />
      </div>
    </>
  );
};

export default Navbar;
