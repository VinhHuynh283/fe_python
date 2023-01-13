import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import BaseLayout from "../layout/BaseLayout";
import Category from "../pages/Category";
import CreateDevice from "../pages/CreateDevice";
import CreateCategory from "../pages/CreateCategory";
import UpdateDevice from "../pages/UpdateDevice";
import UpdateCategory from "../pages/UpdateCategory";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/danh-muc",
        element: <Category />,
      },
      {
        path: "/tao-thiet-bi",
        element: <CreateDevice />,
      },
      {
        path: "/tao-danh-muc",
        element: <CreateCategory />,
      },
      {
        path: "/cap-nhat-thiet-bi/:id",
        element: <UpdateDevice />,
      },
      {
        path: "/cap-nhat-danh-muc/:id",
        element: <UpdateCategory />,
      },
    ],
  },
  {

    path: "/login",
    element: <Login />,

  },
]);
