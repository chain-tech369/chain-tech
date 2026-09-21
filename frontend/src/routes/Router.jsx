import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProfileLayout from "../layouts/ProfileLayout";

// =====================================
// PUBLIC PAGES
// =====================================
import {
  HomePage,
  AboutPage,
  ContactPage,
  ServicePage,
} from "../pages/public-pages";

// =====================================
// USER PAGES
// =====================================
import {
  LoginPage,
  RegisterPage,
  LogoutPage,
} from "../pages/user-pages";

// =====================================
// PROTECTED PAGES
// =====================================
import {
  DashboardPage,
  JoinUsPage,
  ServiceRequestPage,
  ProtectedHomePage,
  ProtectedServicePage,
  ProfilePage,
} from "../pages/protected-pages";

// =====================================
// PROFILE / ACCOUNT PAGES
// =====================================
import {
  AccountDashboardPage,
  EditAccountPage,
  EditProfilePage,
  SettingsPage,
} from "../pages/ProfilePages";

// =====================================
// ROUTER
// =====================================
export const router = createBrowserRouter([
  // =====================================
  // PUBLIC ROUTES
  // =====================================
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/services",
        element: <ServicePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  // =====================================
  // PROTECTED ROUTES
  // =====================================
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/home",
        element: <ProtectedHomePage />,
      },
      {
        path: "/join-us",
        element: <JoinUsPage />,
      },
      {
        path: "/service-request",
        element: <ServiceRequestPage />,
      },
      {
        path: "/service",
        element: <ProtectedServicePage />,
      },

      // =====================================
      // PROFILE PAGE
      // =====================================
      {
        path: "/profile",
        element: <ProfilePage />,
      },

      // =====================================
      // ACCOUNT / PROFILE LAYOUT
      // =====================================
      {
        element: <ProfileLayout />,
        children: [
          // Account Dashboard
          {
            path: "/account-dashboard",
            element: <AccountDashboardPage />,
          },

          // Edit Account
          {
            path: "/account/edit",
            element: <EditAccountPage />,
          },

          // Edit Profile
          {
            path: "/profile/edit",
            element: <EditProfilePage />,
          },

          // Settings
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },

      // =====================================
      // LOGOUT
      // =====================================
      {
        path: "/logout",
        element: <LogoutPage />,
      },
    ],
  },
]);