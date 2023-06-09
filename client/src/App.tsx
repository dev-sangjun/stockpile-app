import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./layouts/Navbar";
import navbarItems from "./layouts/Navbar/navbar-items";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./states/store";
import { asyncFetchSymbols } from "./states/stocks.reducer";
import SignIn from "./pages/SignIn";
import { asyncFetchUser } from "./states/user.reducer";
import { getUserId } from "./states/auth.reducer";

const PublicLayout = () => (
  <div className="flex flex-col bg-slate-200">
    <div className="max-w-7xl h-screen w-full mx-auto py-24">
      <Outlet />
    </div>
  </div>
);

const PrivateLayout = () => (
  <div className="flex flex-col bg-slate-200">
    <Navbar navbarItems={navbarItems} />
    <div className="max-w-7xl h-screen w-full mx-auto py-24">
      <Outlet />
    </div>
  </div>
);

const publicRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "*",
        element: <Navigate replace to="/signin" />,
      },
    ],
  },
]);

const privateRouter = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      ...navbarItems.map(({ path, element }) => ({
        path,
        element,
      })),
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => getUserId(state));
  useEffect(() => {
    const fetchStates = async () => {
      await dispatch(asyncFetchSymbols());
      await dispatch(asyncFetchUser());
    };
    fetchStates();
  }, [dispatch, userId]);
  return <RouterProvider router={userId ? privateRouter : publicRouter} />;
}

export default App;
