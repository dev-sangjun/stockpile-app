import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { RootState } from "./states/store";
import { getStocks, updateStocks } from "./states/stocks.reducer";
import Navbar from "./layouts/Navbar";
import navbarItems from "./layouts/Navbar/navbar-items";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useFetchUserStocks } from "./utils/api.utils";
import { useDispatch } from "react-redux";

const Layout = () => (
  <div className="h-screen flex flex-col bg-slate-100">
    <Navbar navbarItems={navbarItems} />
    <div className="max-w-7xl w-full h-full mx-auto px-4">
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
  const [userStocks] = useFetchUserStocks();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateStocks(userStocks));
  }, [userStocks, dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
