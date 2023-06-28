import { RouterProvider } from "react-router-dom";
import { privateRouter, publicRouter } from "./pages";
import { useInit } from "./hooks";
import "./utils/i18n.utils";
import "./App.css";

function App() {
  const { isFetched, isSignedIn } = useInit();
  if (!isFetched) {
    return null;
  }
  return <RouterProvider router={isSignedIn ? privateRouter : publicRouter} />;
}

export default App;
