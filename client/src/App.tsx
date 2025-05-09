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
import DonationCampaign from "./pages/donationCampaign";
import ContactUs from "./pages/contactUs";
import PaymentSuccess from "./pages/paymentSuccess";
import PaymentFailure from "./pages/paymentFailure";
import TreasureDetail from "./pages/treasureDetail";
import { SocketProvider } from "./context/SocketContext";
import AdminTreasures from "./pages/adminTreasures";
import PromoterDonationCampaign from "./pages/promoterDonationCampaign";

function App() {
  return (
    <>
      <SocketProvider>
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
                  {
                    path: "/explorer/donation-campaigns",
                    element: <DonationCampaign />,
                  },
                  { path: "/explorer/contact", element: <ContactUs /> },
                  {
                    path: "/explorer/payment-successful",
                    element: <PaymentSuccess />,
                  },
                  {
                    path: "/explorer/payment-failure",
                    element: <PaymentFailure />,
                  },
                  {
                    path: "/explorer/treasure/:id",
                    element: <TreasureDetail />,
                  },
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
                  {path: "/promoter/donation-campaign", element: <PromoterDonationCampaign/>}
                ],
              },
              {
                path: "/admin",
                element: <AdminAuthGuard />,
                children: [
                  { path: "/admin/dashboard", element: <AdminDashboard /> },
                  { path: "/admin/reviews", element: <AdminReviews /> },
                  { path: "/admin/donation", element: <AdminDontaion /> },
                  { path: "/admin/treasures", element: <AdminTreasures /> },
                ],
              },
            ])}
          ></RouterProvider>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </SocketProvider>
    </>
  );
}

export default App;
