import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import Navbar from "../components/Navbar";
import Settings from "./Settings";
import Portfolios from "./Portfolios";
import Modal from "../components/Modal";

const BASE_CONTAINER_CLASSES =
  "flex justify-center h-screen max-w-[1440px] mx-auto bg-base-100 md:min-w-[1080px]";
const OUTLET_CONTAINER_CLASSES =
  "flex-1 flex flex-col overflow-hidden md:min-w-[840px] pt-0 pb-[4.5rem] md:p-16";

export const privateRouter = createBrowserRouter([
  {
    element: (
      <div className={BASE_CONTAINER_CLASSES}>
        <Navbar />
        <div className={`${OUTLET_CONTAINER_CLASSES}`}>
          <Outlet />
        </div>
        <Toaster containerClassName="custom-toaster" />
        <Modal />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/portfolios",
        element: <Portfolios />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <Navigate replace to="/" />,
      },
    ],
  },
]);

export const publicRouter = createBrowserRouter([
  {
    element: (
      <div className={BASE_CONTAINER_CLASSES}>
        <div className={OUTLET_CONTAINER_CLASSES}>
          <Outlet />
        </div>
        <Toaster />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "*",
        element: <Navigate replace to="/" />,
      },
    ],
  },
]);
