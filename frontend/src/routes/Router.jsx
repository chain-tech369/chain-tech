import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProfileLayout from "../layouts/ProfileLayout";

// =====================================
// LOADERS
// =====================================

import { userLoader } from "../loaders/userLoader";
import { profileLoader } from "../loaders/profileLoader";

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
  JoinUsPage,
  ServiceRequestPage,
  ProtectedHomePage,
  ProtectedServicePage,
  CurrentUserPage,
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
        path: "/protected-home",
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
        path: "/protected-services",
        element: <ProtectedServicePage />,
      },

      {
        path: "/current-user",
        element: <CurrentUserPage />,
      },

      // =====================================
      // PROFILE / ACCOUNT
      // =====================================

      {
        element: <ProfileLayout />,

        children: [
          {
            path: "/account-dashboard",
            element: <AccountDashboardPage />,
          },

          {
            path: "/account/edit",
            element: <EditAccountPage />,
          },

          {
            path: "/profile/edit",
            element: <EditProfilePage />,
          },

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