import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineCalculator,
} from "react-icons/hi2";
import { Calculators, Home, Portfolios } from "../../pages";

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
  {
    label: "Calculators",
    path: "/calculators",
    icon: <HiOutlineCalculator />,
    element: <Calculators />,
  },
];

export default navbarItems;
