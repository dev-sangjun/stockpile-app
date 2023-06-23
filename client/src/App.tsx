import { RouterProvider } from "react-router-dom";
import { privateRouter, publicRouter } from "./pages";
import "./App.css";

function App() {
  // TODO: replace isLoaded & isSignedIn with hooks
  const isLoaded = true;
  const isSignedIn = true;
  if (!isLoaded) {
    return null;
  }
  return <RouterProvider router={isSignedIn ? privateRouter : publicRouter} />;
}

export default App;
