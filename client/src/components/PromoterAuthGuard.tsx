import { Navigate, Outlet } from "react-router-dom";

const isAuthentitcated = () => {
  return !!localStorage.getItem("Authorization");
};

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
