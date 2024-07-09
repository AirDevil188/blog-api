import App from "../App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../components/Homepage";
import LogIn from "../components/Log-in";
import ErrorPage from "./ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/log-in",
          element: <LogIn />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
