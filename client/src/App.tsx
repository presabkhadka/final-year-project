import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import Otp from "./pages/otp";
import PromoterLogin from "./pages/promoterLogin";

function App() {
  return (
    <RouterProvider router={createBrowserRouter([
      {path: '/user/login', element:<Login/>},
      {path: '/promoter/login', element:<PromoterLogin/>},
      {path: '/signup', element:<Register/>},
      {path: '/verify', element: <Otp/>}
    ])}>

    </RouterProvider>
  );
}

export default App;
