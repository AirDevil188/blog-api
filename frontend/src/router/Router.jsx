import App from "../App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../components/Homepage";
import LogIn from "../components/Log-in";
import ErrorPage from "./ErrorPage";
import SignUp from "../components/Sign-up";

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
        {
          path: "/sign-up",
          element: <SignUp />,
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
