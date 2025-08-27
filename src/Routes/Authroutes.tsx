import { JSX, lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Login = lazy(() => import("../Auth/login/Login"));
const Signup = lazy(() => import("../Auth/SignUp/SignUp"));

const isAuthenticated = () => !!localStorage.getItem("auth_token");

// Public Route Wrapper
const PublicRoute = ({ element }: { element: JSX.Element }) =>
  isAuthenticated() ? <Navigate to="/dashboard" replace /> : element;

export const authRoutes: RouteObject[] = [

  {
    path: "login",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <Signup />
      </Suspense>
    ),
  },
];
