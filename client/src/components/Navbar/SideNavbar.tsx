import { FC } from "react";
import { Link } from "react-router-dom";
import { NavbarItem } from ".";
import { BASE_BUTTON_CLASSES } from "../../constants/classes.constants";
import Logo from "../Logo";

interface SideNavbarProps {
  navbarItems: NavbarItem[];
}

const SideNavbar: FC<SideNavbarProps> = ({ navbarItems }) => {
  const renderNavbarItems = () =>
    navbarItems.map(({ path, text, icon, onClick }) =>
      path ? (
        <Link
          className={`${BASE_BUTTON_CLASSES.sm} justify-start`}
          key={text}
          to={path}
        >
          {icon}
          {text}
        </Link>
      ) : (
        <div>
          <button
            className={`${BASE_BUTTON_CLASSES.sm} w-full justify-start`}
            onClick={onClick}
          >
            {icon}
            {text}
          </button>
        </div>
      )
    );

  return (
    <div className="flex flex-col justify-between border-r h-full px-8 py-16">
      <div className="flex flex-col gap-20">
        <Logo />
        <div className="flex flex-col gap-4">{renderNavbarItems()}</div>
      </div>
    </div>
  );
};

export default SideNavbar;
