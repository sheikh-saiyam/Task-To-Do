import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomeLayout from "../layout/HomeLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
    ],
  },
]);

export default router;
