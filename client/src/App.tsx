import { RouterProvider } from "react-router-dom";
import { privateRouter, publicRouter } from "./pages";
import "./App.css";
import { useInit } from "./hooks";

function App() {
  const { isFetched, isSignedIn } = useInit();
  if (!isFetched) {
    return null;
  }
  return <RouterProvider router={isSignedIn ? privateRouter : publicRouter} />;
}

export default App;
