import React, { useEffect, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";
import Loading from "./components/ui/Loading";

// 🔁 Lazy-loaded components
const Signup = React.lazy(() => import("./auth/Signup"));
const Login = React.lazy(() => import("./auth/Login"));
const ForgotPassword = React.lazy(() => import("./auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./auth/ResetPassword"));
const VerifyEmail = React.lazy(() => import("./auth/VerifyEmail"));

const HeroSection = React.lazy(() => import("./components/ui/HeroSection"));
const MainLayout = React.lazy(() => import("./layout/MainLayout"));
const Profile = React.lazy(() => import("./components/Profile"));
const SearchPage = React.lazy(() => import("./components/SearchPage"));
const ResturantDetails = React.lazy(() => import("./components/ResturantDetails"));
const Cart = React.lazy(() => import("./components/Cart"));
const Restaurant = React.lazy(() => import("./admin/Restaurant"));
const AddMenu = React.lazy(() => import("./admin/AddMenu"));
const Order = React.lazy(() => import("./admin/Order"));
const Succcess = React.lazy(() => import("./components/Succcess"));
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./components/TermsOfService"));
const ContactUs = React.lazy(() => import("./components/ContactUs"));

// 🔐 Protected routes
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.admin) return <Navigate to="/" replace />;
  return children;
};

// 🌐 App Router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "/", element: <HeroSection /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/profile", element: <Profile /> },
      { path: "/search/:text", element: <SearchPage /> },
      { path: "/restaurant/:id", element: <ResturantDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/status", element: <Succcess /> },
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Order />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

// 🌟 App Component
function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={appRouter} />
      </Suspense>
    </main>
  );
}

export default App;
