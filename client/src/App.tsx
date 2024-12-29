import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <RouterProvider router={createBrowserRouter([
      {path: '/login', element:<Login/>},
      {path: '/signup', element:<Register/>},
    ])}>

    </RouterProvider>
  );
}

export default App;
