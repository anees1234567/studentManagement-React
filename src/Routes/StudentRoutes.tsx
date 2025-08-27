import { Navigate, RouteObject } from "react-router-dom";
import { JSX } from "react";
import StudentList from "../Pages/StudentDetails/components/StudentList"
import StudentDetails from "../Pages/StudentDetails/components/AddOrEditStudent";

const isAuthenticated = () => !!localStorage.getItem("auth_token");

// Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) =>
  isAuthenticated() ? element : <Navigate to="/login" replace />;

export const studentRoutes: RouteObject[] = [
  {
    index:true,
    path: "students",
    element: <ProtectedRoute element={<StudentList />} />,
  },
  {
    path: "addstudents",
    element: <ProtectedRoute element={<StudentDetails />} />,
  },
];
