import { createBrowserRouter } from "react-router-dom";

// Admin layout
import AdminLayout from "../../layouts/AdminLayout";

// Authorization
import ProtectedRoute from "../../components/ProtectedRoute";

// import admin pages here
import {
  CreateEstimatedBudgetPage,
  EditEstimatedBudgetPage,
  DeleteEstimatedBudgetPage,
  CreateExpectedTimelinePage,
  EditExpectedTimelinePage,
  DeleteExpectedTimelinePage,
  CreateRolePage,
  EditRolePage,
  DeleteRolePage,
} from "../../pages/admin_pages";


export const adminRoutes = [
  {
    element: <AdminLayout />,
    children: [
      // =====================================
      // ESTIMATED BUDGET
      // =====================================

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

      // =====================================
      // EXPECTED TIMELINE
      // =====================================

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

      // =====================================
      // ROLES
      // =====================================

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
];