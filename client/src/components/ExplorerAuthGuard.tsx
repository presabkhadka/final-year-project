import { Navigate, Outlet } from "react-router-dom";

// check if token is present
const isAuthenticated = () => {
  return !!localStorage.getItem("Authorization");
};

// get the user role from the headers
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
