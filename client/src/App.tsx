import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import Otp from "./pages/otp";
import PromoterLogin from "./pages/promoterLogin";
import PromoterRegister from "./pages/promoterRegister";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/explorer/login", element: <Login /> },
        { path: "/promoter/login", element: <PromoterLogin /> },
        { path: "/explorer/signup", element: <Register /> },
        { path: "/promoter/signup", element: <PromoterRegister /> },
        { path: "/promoter/verify", element: <Otp /> },
      ])}
    ></RouterProvider>
  );
}

export default App;
