import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("Authorization");
};

const getExplorerRole = () => {
  return localStorage.getItem("UserRole");
};

const ExplorerAuthGuard = () => {
  return isAuthenticated() && getExplorerRole() === "explorer" ? (
    <Outlet />
  ) : (
    <Navigate to={"/explorer/login"} />
  );
};

export default ExplorerAuthGuard;
