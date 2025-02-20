import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomeLayout from "../layout/HomeLayout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
    ],
  },
]);

export default router;
