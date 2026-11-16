
import { createBrowserRouter } from "react-router-dom";

// ==============================================
// IMPORT LAYOUTS
// ==============================================

import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import AdminLayout from "../layouts/AdminLayout";

// ==============================================
// IMPORT ROUTE GUARDS
// ==============================================

import ProtectedRoute from "../components/ProtectedRoute";

// ==============================================
// IMPORT LOADERS
// ==============================================

import { servicerequestLoader } from "../loaders/servicerequestLoader";

// ==============================================
// IMPORT PUBLIC PAGES
// ==============================================

import {
  HomePage,
  AboutPage,
  ContactPage,
  ServicePage,
} from "../pages/public-pages";

// ==============================================
// IMPORT USER PAGES
// ==============================================

import {
  LoginPage,
  RegisterPage,
  LogoutPage,
} from "../myapp/auth/pages";

// ==============================================
// IMPORT PROTECTED PAGES
// ==============================================

import {
  ServiceRequestPage,
  ProtectedHomePage,
  ProtectedServicePage,
  CurrentUserPage,
} from "../pages/protected-pages";

// ==============================================
// IMPORT PROFILE PAGES
// ==============================================

import {
  AccountDashboardPage,
  EditAccountPage,
} from "../myapp/user/pages";

import {
  EditProfilePage,
  SettingsPage,
} from "../myapp/profile/pages";

import {
  JoinUsPage,
} from "../myapp/join_us/pages";


// ==============================================
// IMPORT ADMIN PAGES
// ==============================================

import {
  CreateEstimatedBudgetPage,
  DeleteEstimatedBudgetPage,
  EditEstimatedBudgetPage,
  CreateExpectedTimelinePage,
  DeleteExpectedTimelinePage,
  EditExpectedTimelinePage,
  CreateRolePage,
  DeleteRolePage,
  EditRolePage,
} from "../pages/admin_pages";

// ==============================================
// ROUTER
// ==============================================

export const router = createBrowserRouter([
  // =====================================
  // PUBLIC LAYOUT
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
  // PROTECTED USER LAYOUT
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
        loader: servicerequestLoader,
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
      // PROFILE LAYOUT
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

  // =====================================
  // ADMIN LAYOUT
  // =====================================

  {
    element: <AdminLayout />,
    children: [
      // -------------------------------------
      // ESTIMATED BUDGET
      // -------------------------------------

      {
        element: <ProtectedRoute permission="estimated_budget:create" />,
        children: [
          {
            path: "/createbudget",
            element: <CreateEstimatedBudgetPage />,
          },
        ],
      },

      {
        element: <ProtectedRoute permission="estimated_budget:update" />,
        children: [
          {
            path: "/editbudget",
            element: <EditEstimatedBudgetPage />,
          },
        ],
      },

      {
        element: <ProtectedRoute permission="estimated_budget:delete" />,
        children: [
          {
            path: "/deletebudget",
            element: <DeleteEstimatedBudgetPage />,
          },
        ],
      },

      // -------------------------------------
      // EXPECTED TIMELINE
      // -------------------------------------

      {
        element: <ProtectedRoute permission="expected_timeline:create" />,
        children: [
          {
            path: "/createtimeline",
            element: <CreateExpectedTimelinePage />,
          },
        ],
      },

      {
        element: <ProtectedRoute permission="expected_timeline:update" />,
        children: [
          {
            path: "/edittimeline",
            element: <EditExpectedTimelinePage />,
          },
        ],
      },

      {
        element: <ProtectedRoute permission="expected_timeline:delete" />,
        children: [
          {
            path: "/deletetimeline",
            element: <DeleteExpectedTimelinePage />,
          },
        ],
      },

      // -------------------------------------
      // ROLES
      // -------------------------------------

      {
        element: <ProtectedRoute permission="role:create" />,
        children: [
          {
            path: "/createroles",
            element: <CreateRolePage />,
          },
        ],
      },

      {
        element: <ProtectedRoute permission="role:update" />,
        children: [
          {
            path: "/editroles",
            element: <EditRolePage />,
          },
        ],
      },

      {
        element: <ProtectedRoute permission="role:delete" />,
        children: [
          {
            path: "/deleterole",
            element: <DeleteRolePage />,
          },
        ],
      },
    ],
  },
]);
