import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import Navbar from "../components/desktop/Navbar";
import Settings from "./Settings";
import Portfolios from "./Portfolios";

const BASE_CONTAINER_CLASSES = "flex h-screen bg-base-100";
const OUTLET_CONTAINER_CLASSES = "p-24";

export const privateRouter = createBrowserRouter([
  {
    element: (
      <div className={BASE_CONTAINER_CLASSES}>
        <Navbar />
        <div className={`${OUTLET_CONTAINER_CLASSES}`}>
          <Outlet />
        </div>
        <Toaster />
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
