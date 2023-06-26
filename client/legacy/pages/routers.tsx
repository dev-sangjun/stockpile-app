import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import navbarItems from "../components/Navbar/navbar-items";
import SignIn from "./SignIn";
import Modal from "../components/Modal";
import { Toaster } from "react-hot-toast";
import Settings from "./Settings";

const publicRouter = createBrowserRouter([
  {
    element: (
      <div className="flex flex-col bg-base-100">
        <div className="max-w-7xl h-screen w-full mx-auto py-24">
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

const privateRouter = createBrowserRouter([
  {
    element: (
      <div className="flex flex-col bg-base-100">
        <Navbar />
        <div className="max-w-7xl h-screen w-full mx-auto py-16 md:py-8 md:pl-64 overflow-y-auto">
          <Outlet />
        </div>
        <Toaster />
        <Modal />
      </div>
    ),
    children: [
      ...navbarItems.map(({ path, element }) => ({
        path,
        element,
      })),
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/signin",
        element: <Navigate replace to="/" />,
      },
    ],
  },
]);

export default {
  public: publicRouter,
  private: privateRouter,
};