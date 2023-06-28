import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => (
  <Link
    to="/"
    className="btn btn-ghost btn-link normal-case no-underline text-black hover:no-underline"
  >
    <img className="w-12" src={logo} alt="logo" />
    <span className="text-xl">Stockpile</span>
  </Link>
);

export default Logo;
