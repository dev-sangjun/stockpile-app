import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { updateStocks } from "./states/stocks.reducer";
import Navbar from "./layouts/Navbar";
import navbarItems from "./layouts/Navbar/navbar-items";
import "./App.css";
import { useEffect } from "react";
import { useFetchPortfolios, useFetchUserStocks } from "./utils/api.utils";
import { useDispatch } from "react-redux";
import { updatePortfolios } from "./states/portfolios.reducer";
import { getInvestmentsFromPortfolios } from "./utils/entity.utils";
import { updateInvestments } from "./states/investments.reducer";

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
  const [stocks] = useFetchUserStocks();
  const [portfolios] = useFetchPortfolios();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateStocks(stocks));
    dispatch(updatePortfolios(portfolios));
    const investments = getInvestmentsFromPortfolios(portfolios);
    dispatch(updateInvestments(investments));
  }, [stocks, portfolios, dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
