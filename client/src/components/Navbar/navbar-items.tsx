import { HiOutlineHome, HiOutlineChartBar } from "react-icons/hi2";
import { Home, Portfolios } from "../../pages";

export type NavbarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  element: React.ReactNode;
};

const navbarItems: NavbarItem[] = [
  {
    label: "Home",
    path: "/",
    icon: <HiOutlineHome />,
    element: <Home />,
  },
  {
    label: "Portfolios",
    path: "/portfolios",
    icon: <HiOutlineChartBar />,
    element: <Portfolios />,
  },
];

export default navbarItems;
