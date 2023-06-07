import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import navbarItems from "./layouts/Navbar/navbar-items";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./states/store";
import { TEST_USER_ID } from "./dev/constants";
import { asyncFetchUser } from "./states/user.reducer";
import { asyncFetchSymbols } from "./states/stocks.reducer";

const Layout = () => (
  <div className="flex flex-col bg-slate-200">
    <Navbar navbarItems={navbarItems} />
    <div className="max-w-7xl w-full mx-auto">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: navbarItems.map(({ path, element }) => ({
      path,
      element,
    })),
  },
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchStates = async () => {
      await dispatch(asyncFetchSymbols());
      await dispatch(asyncFetchUser(TEST_USER_ID));
    };
    fetchStates();
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
