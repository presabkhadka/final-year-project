import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("Authorization");
};

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
