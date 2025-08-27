import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Home from "../Pages/Home/Home";
import PageNotFound from "../ErrorPages/PageNotFound";
import { authRoutes } from "./Authroutes";
import { studentRoutes } from "./StudentRoutes";
import { JSX } from "react";
import { ErrorElement } from "../ErrorPages/Error";

const isAuthenticated = () => !!localStorage.getItem("authToken");
const ProtectedRoute = ({ element }: { element: JSX.Element }) =>
  isAuthenticated() ? element : <Navigate to="/login" replace />;



const routelist: RouteObject[] = [
  {
    path: "",
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<Home />} />,
      },
      ...authRoutes,
      ...studentRoutes,
      {
        path: "page-not-found",
        element: <PageNotFound />,
      },
      {
        path: "*",
        element: <Navigate to="page-not-found" replace />,
      },
    ],
  },
];

export const globalRouter = createBrowserRouter(routelist);
