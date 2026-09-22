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
  currentUserPage,
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
      // HOME
      {
        path: "/",
        element: <HomePage />,
      },

      // ABOUT
      {
        path: "/about",
        element: <AboutPage />,
      },

      // CONTACT
      {
        path: "/contact",
        element: <ContactPage />,
      },

      // SERVICES
      {
        path: "/services",
        element: <ServicePage />,
      },

      // LOGIN
      {
        path: "/login",
        element: <LoginPage />,
      },

      // REGISTER
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
     loader: currentUserLoader,
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
      // CURRENT USER
      // =====================================
      {
        path: "/current-user",
        element: <currentUserPage />,
      },

      // =====================================
      // ACCOUNT / PROFILE LAYOUT
      // =====================================
      {
        element: <ProfileLayout />,
        loader: currentUserLoader,
        children: [
          // =====================================
          // ACCOUNT DASHBOARD
          // GET /users/me
          // =====================================
          {
            path: "/account-dashboard",
            element: <AccountDashboardPage />,
            loader: currentUserLoader,
          },

          // =====================================
          // EDIT ACCOUNT
          // GET /users/me
          // =====================================
          {
            path: "/account/edit",
            element: <EditAccountPage />,
            loader: currentUserLoader,
          },

          // =====================================
          // EDIT PROFILE
          // GET CURRENT USER + PROFILE
          // =====================================
          {
            path: "/profile/edit",
            element: <EditProfilePage />,
            loader: profileLoader,
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
          // GET CURRENT PROFILE
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