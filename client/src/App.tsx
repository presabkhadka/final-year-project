import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import PromoterLogin from "./pages/promoterLogin";
import PromoterRegister from "./pages/promoterRegister";
import PromoterVerify from "./pages/promoterVerify";
import PromoterDashboard from "./pages/promoterDashboard";
import { Toaster } from "@/components/ui/toaster";
import AdminLogin from "./pages/adminLogin";

function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          { path: "/explorer/login", element: <Login /> },
          { path: "/promoter/login", element: <PromoterLogin /> },
          { path: "/admin/login", element: <AdminLogin /> },
          { path: "/explorer/signup", element: <Register /> },
          { path: "/promoter/signup", element: <PromoterRegister /> },
          { path: "/promoter/verify", element: <PromoterVerify /> },
          { path: "/promoter/dashboard", element: <PromoterDashboard /> },
        ])}
      ></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
