import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import navbarItems from "./layouts/Navbar/navbar-items";
import "./App.css";

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
  return <RouterProvider router={router} />;
}

export default App;
