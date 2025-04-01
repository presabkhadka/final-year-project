import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import PromoterLogin from "./pages/promoterLogin";
import PromoterRegister from "./pages/promoterRegister";
import PromoterVerify from "./pages/promoterVerify";
import PromoterDashboard from "./pages/promoterDashboard";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/adminLogin";
import { ThemeProvider } from "./components/theme-provider";
import PromoterReview from "./pages/promoterReviews";
import Promote from "./pages/promoterPromote";
import PromoterAuthGuard from "./components/PromoterAuthGuard";
import AdminAuthGuard from "./components/AdminAuthGuard";
import AdminDashboard from "./pages/adminDashboard";
import AdminReviews from "./pages/adminReviews";
import AdminDontaion from "./pages/adminDonation";
import Landing from "./pages/landing";
import AboutUs from "./pages/aboutUs";
import Leaderboards from "./pages/leaderboards";
import ExplorerAuthGuard from "./components/ExplorerAuthGuard";
import Explore from "./pages/explore";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider
          router={createBrowserRouter([
            { path: "/home", element: <Landing /> },
            { path: "/about-us", element: <AboutUs /> },
            { path: "/explorer/login", element: <Login /> },
            { path: "/promoter/login", element: <PromoterLogin /> },
            { path: "/admin/login", element: <AdminLogin /> },
            { path: "/explorer/signup", element: <Register /> },
            { path: "/promoter/signup", element: <PromoterRegister /> },
            { path: "/promoter/verify", element: <PromoterVerify /> },

            {
              path: "/explorer",
              element: <ExplorerAuthGuard />,
              children: [
                {
                  path: "/explorer/explore",
                  element: <Explore />,
                },
                { path: "/explorer/leaderboards", element: <Leaderboards /> },
              ],
            },

            {
              path: "/promoter",
              element: <PromoterAuthGuard />,
              children: [
                {
                  path: "/promoter/dashboard",
                  element: <PromoterDashboard />,
                },
                { path: "/promoter/reviews", element: <PromoterReview /> },
                { path: "/promoter/promote", element: <Promote /> },
              ],
            },
            {
              path: "/admin",
              element: <AdminAuthGuard />,
              children: [
                { path: "/admin/dashboard", element: <AdminDashboard /> },
                { path: "/admin/reviews", element: <AdminReviews /> },
                { path: "/admin/donation", element: <AdminDontaion /> },
              ],
            },
          ])}
        ></RouterProvider>
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </>
  );
}

export default App;
