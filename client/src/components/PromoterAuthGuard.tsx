import { Navigate, Outlet } from "react-router-dom";

const isAuthentitcated = () => {
  return !!localStorage.getItem("Authorization");
};

const PromoterAuthGuard = () => {
  return isAuthentitcated() ? (
    <Outlet />
  ) : (
    <Navigate to="/promoter/login" replace />
  );
};

export default PromoterAuthGuard;
