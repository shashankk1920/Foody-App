// import "./App.css";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Signup from "./auth/Signup.tsx";
import Login from "./auth/Login.tsx";
import ForgotPassword from "./auth/ForgotPassword.tsx";
import ResetPassword from "./auth/ResetPassword.tsx";
import VerifyEmail from "./auth/VerifyEmail.tsx";

import HeroSection from "./components/ui/HeroSection.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import Profile from "./components/Profile.tsx";
import SearchPage from "./components/SearchPage.tsx";
import ResturantDetails from "./components/ResturantDetails.tsx";

import Cart from "./components/Cart.tsx";
import Restaurant from "./admin/Restaurant.tsx";
import AddMenu from "./admin/AddMenu.tsx";
import Order from "./admin/Order.tsx";
import Succcess from "./components/Succcess.tsx";
import { useUserStore } from "./store/useUserStore.ts";
import { useEffect } from "react";
import Loading from "./components/ui/Loading.tsx";
import PrivacyPolicy from "./components/PrivacyPolicy.tsx";
import TermsOfService from "./components/TermsOfService.tsx";
import ContactUs from "./components/ContactUs.tsx";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
};

const AdminRoute = ({children}:{children:React.ReactNode}) => {
  const {user, isAuthenticated} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.admin){
    return <Navigate to="/" replace/>
  }

  return children;
}

const appRouter = createBrowserRouter([
  {
    path:"/",
     element:<ProtectedRoutes><MainLayout/></ProtectedRoutes>,
    // element:<MainLayout/>,
   

    children:[
        // ...existing routes
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/terms-of-service",
      element: <TermsOfService />,
    },
    {
      path: "/contact-us",
      element: <ContactUs />,
    },
      {
        path:"/",
        element:<HeroSection/>,
      },
      {
        path:"/profile",
        element:<Profile/>,
      },
      {
        path:"/search/:text",
        element:<SearchPage/>,
      },
      {
        path:"/restaurant/:id",
        element:<ResturantDetails/>,
      },
      {
        path:"/cart",
        element:<Cart/>,
      },
      {
        path:"/order/status",
        element:<Succcess/>,
      },
      //From here admin services are also started so a user can become a admin and add or remove or remove a restaurant
      {
        path:"/admin/restaurant",
        element:<AdminRoute><Restaurant/></AdminRoute>,
      },
      {
        path:"/admin/menu",
        element:<AdminRoute><AddMenu/></AdminRoute>,
      },
      {
        path:"/admin/orders",
        element:<AdminRoute><Order/></AdminRoute>,
      },
    ]
  },
    {
      path:"/login",
      element:<AuthenticatedUser><Login/></AuthenticatedUser>
    },
    {
      path:"/signup",
      element:  <AuthenticatedUser><Signup/></AuthenticatedUser>
    },
    {
      path:"/forgot-password",
      element:<AuthenticatedUser><ForgotPassword/></AuthenticatedUser>
    },
    {
      path:"/reset-password",
      element:<ResetPassword/>
    },
    {
      path:"/verify-email",
      element:<VerifyEmail/>
    }
  
])

function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);
  
  if (isCheckingAuth) return <Loading />;
  
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}


export default App;
