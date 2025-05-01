import { Navigate, Outlet } from "react-router-dom";

// check if token is present or not
const isAuthenticated = () => {
  return !!localStorage.getItem("Authorization");
};

// get the user role from the headers
const getUserRole = () => {
  return localStorage.getItem("UserRole");
};

const AdminAuthGuard = () => {
  return isAuthenticated() && getUserRole() === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default AdminAuthGuard;
