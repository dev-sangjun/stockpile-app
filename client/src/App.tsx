import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { asyncFetchStocks, asyncFetchSymbols } from "./states/stocks.reducer";
import Navbar from "./layouts/Navbar";
import navbarItems from "./layouts/Navbar/navbar-items";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncFetchPortfolios } from "./states/portfolios.reducer";
import { asyncFetchInvestments } from "./states/investments.reducer";
import { AppDispatch } from "./states/store";
import { TEST_USER_ID } from "./dev/constants";

const Layout = () => (
  <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
    <Navbar navbarItems={navbarItems} />
    <div className="max-w-7xl w-full h-full mx-auto">
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
      await dispatch(asyncFetchStocks(TEST_USER_ID));
      await dispatch(asyncFetchPortfolios(TEST_USER_ID));
      await dispatch(asyncFetchInvestments(TEST_USER_ID));
      await dispatch(asyncFetchSymbols());
    };
    fetchStates();
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
