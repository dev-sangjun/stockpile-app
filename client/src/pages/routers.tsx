import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import navbarItems from "../components/Navbar/navbar-items";
import SignIn from "./SignIn";

const publicRouter = createBrowserRouter([
  {
    element: (
      <div className="flex flex-col bg-slate-200">
        <div className="max-w-7xl h-screen w-full mx-auto py-24">
          <Outlet />
        </div>
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
      <div className="flex flex-col bg-slate-200">
        <Navbar />
        <div className="max-w-7xl h-screen w-full mx-auto py-16 md:py-16 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    ),
    children: [
      ...navbarItems.map(({ path, element }) => ({
        path,
        element,
      })),
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
