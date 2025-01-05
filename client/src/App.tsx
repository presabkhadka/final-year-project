import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import Otp from "./pages/otp";

function App() {
  return (
    <RouterProvider router={createBrowserRouter([
      {path: '/login', element:<Login/>},
      {path: '/signup', element:<Register/>},
      {path: '/verify', element: <Otp/>}
    ])}>

    </RouterProvider>
  );
}

export default App;
