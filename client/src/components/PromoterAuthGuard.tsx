import { Navigate, Outlet } from "react-router-dom";

// check the token from the headers
const isAuthentitcated = () => {
  return !!localStorage.getItem("Authorization");
};

// get the user role from the headers
const getUserRole = () => {
  return localStorage.getItem("UserRole");
};

const PromoterAuthGuard = () => {
  return isAuthentitcated() && getUserRole() === "promoter" ? (
    <Outlet />
  ) : (
    <Navigate to="/promoter/login" replace />
  );
};

export default PromoterAuthGuard;
