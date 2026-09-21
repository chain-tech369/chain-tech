import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProfileLayout from "../layouts/ProfileLayout";

// =====================================
// LOADERS
// =====================================
import { currentUserLoader } from "../loaders/userLoader";
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
  UserDetailPage,
  ProfileDetailPage,
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
      // =====================================
      // DASHBOARD
      // =====================================
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },

      // =====================================
      // PROTECTED HOME
      // =====================================
      {
        path: "/home",
        element: <ProtectedHomePage />,
      },

      // =====================================
      // JOIN US
      // =====================================
      {
        path: "/join-us",
        element: <JoinUsPage />,
      },

      // =====================================
      // SERVICE REQUEST
      // =====================================
      {
        path: "/service-request",
        element: <ServiceRequestPage />,
      },

      // =====================================
      // PROTECTED SERVICES
      // =====================================
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
          // =====================================
          // ACCOUNT DASHBOARD
          // =====================================
          {
            path: "/account-dashboard",
            element: <AccountDashboardPage />,
            loader: currentUserLoader,
          },

          // =====================================
          // EDIT ACCOUNT
          // =====================================
          {
            path: "/account/edit",
            element: <EditAccountPage />,
          },

          // =====================================
          // EDIT PROFILE
          // =====================================
          {
            path: "/profile/edit",
            element: <EditProfilePage />,
          },

          // =====================================
          // SETTINGS
          // =====================================
          {
            path: "/settings",
            element: <SettingsPage />,
            
          },

          // =====================================
          // CURRENT USER DETAIL
          // GET /users/me
          // =====================================
          {
            path: "/user-detail",
            element: <UserDetailPage />,
            loader: currentUserLoader,
          },

          // =====================================
          // PROFILE DETAIL
          // =====================================
          {
            path: "/profile-detail",
            element: <ProfileDetailPage />,
            loader: profileLoader,
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