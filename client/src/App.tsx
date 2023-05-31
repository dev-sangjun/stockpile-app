import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import navbarItems from "./layouts/Navbar/navbar-items";
import "./App.css";

const Layout = () => (
  <>
    <Navbar navbarItems={navbarItems} />
    <div className="max-w-7xl mx-auto px-4">
      <Outlet />
    </div>
  </>
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
  return <RouterProvider router={router} />;
}

export default App;
