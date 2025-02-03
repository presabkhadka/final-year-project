import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import PromoterLogin from "./pages/promoterLogin";
import PromoterRegister from "./pages/promoterRegister";
import PromoterVerify from "./pages/promoterVerify";
import PromoterDashboard from "./pages/promoterDashboard";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/explorer/login", element: <Login /> },
        { path: "/promoter/login", element: <PromoterLogin /> },
        { path: "/explorer/signup", element: <Register /> },
        { path: "/promoter/signup", element: <PromoterRegister /> },
        { path: "/promoter/verify", element: <PromoterVerify /> },
        { path: "/promoter/dashboard", element: <PromoterDashboard /> },
      ])}
    ></RouterProvider>
  );
}

export default App;
