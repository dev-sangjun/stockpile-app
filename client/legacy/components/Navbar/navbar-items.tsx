import {
  HiOutlineChartBar,
  HiOutlineCog8Tooth,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { Home, Portfolios } from "../../pages";
import Settings from "../../pages/Settings";

export type NavbarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  element: React.ReactNode;
};

const navbarItems: NavbarItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineSquares2X2 className="text-lg" />,
    element: <Home />,
  },
  {
    label: "Portfolios",
    path: "/portfolios",
    icon: <HiOutlineChartBar className="text-lg" />,
    element: <Portfolios />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog8Tooth className="text-lg" />,
    element: <Settings />,
  },
];

export default navbarItems;
