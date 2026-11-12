import { createBrowserRouter } from "react-router-dom";

// ==============================================
// Import Layouts Here
// ==============================================

import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import AdminLayout from "../layouts/AdminLayout";



// =====================================
// Import LOADERS Here
// =====================================

import { servicerequestLoader } from "../loaders/servicerequestLoader";

// =====================================
// Import PUBLIC PAGES Here
// =====================================

import {
  HomePage,
  AboutPage,
  ContactPage,
  ServicePage,
} from "../pages/public-pages";

// =====================================
// Import USER PAGES Here
// =====================================

import {
  LoginPage,
  RegisterPage,
  LogoutPage,
} from "../pages/user-pages";

// =====================================
// Import PROTECTED PAGES Here
// =====================================

import {
  JoinUsPage,
  ServiceRequestPage,
  ProtectedHomePage,
  ProtectedServicePage,
  CurrentUserPage,
} from "../pages/protected-pages";

// =====================================
// Import PROFILE PAGES Here
// =====================================

import {
  AccountDashboardPage,
  EditAccountPage,
  EditProfilePage,
  SettingsPage,
} from "../pages/ProfilePages";

// =====================================
// Import ADMIN PAGES Here
// =====================================

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

// =====================================
// ROUTER
// =====================================

export const router = createBrowserRouter([
  // =====================================
  // =========***PUBLIC Layout***=========
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

  //*--------------------------------------------------------------------*//

  // =====================================
  // ========***PROTECTED Layout***=======
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

      //*-------------------------------------------------------------------*//

      // =====================================
      // ========***PROFILE Layout***=========
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
      {
        path: "/logout",
        element: <LogoutPage />,
      },
    ],
  },
  
  //*--------------------------------------------------------------------------*//

  // ========================================
  // ===========***ADMIN Layout***===========
  // ========================================
  {
    element: <AdminLayout />,
    children:[
  // ----------------------------------------
  // estimated budget pages
  // ----------------------------------------
    {
      path: "/createbudget",
        element: < CreateEstimatedBudgetPage/>,
    },
    {
      path: "/editbudget",
        element: <EditEstimatedBudgetPage />,
    },
    {
      path: "/deletebudget",
        element: <DeleteEstimatedBudgetPage />,
    },
  // -----------------------------------------
  // estimated budget pages
  // -----------------------------------------
    {
      path: "/createtimeline",
        element: < CreateExpectedTimelinePage/>,
    },
    {
      path: "/edittimeline",
        element: <EditExpectedTimelinePage />,
    },
    {
      path: "/deletetimeline",
        element: <DeleteExpectedTimelinePage />,
    },
    // -----------------------------------------
  // roles pages
  // -----------------------------------------
    {
      path: "/createroles",
        element: < CreateRolePage/>,
    },
    {
      path: "/editroles",
        element: <EditRolePage />,
    },
    {
      path: "/deleterole",
        element: <DeleteRolePage />,
    },
    ],
  },
]);