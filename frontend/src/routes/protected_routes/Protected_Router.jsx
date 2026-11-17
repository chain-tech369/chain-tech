// Layouts
import ProtectedLayout from "../../layouts/ProtectedLayout";
import ProfileLayout from "../../layouts/ProfileLayout";

// Protected application pages
import {
  ProtectedHomePage,
  JoinUsPage,
  ServiceRequestPage,
  ProtectedServicePage,
  CurrentUserPage,
  AccountDashboardPage,
  EditAccountPage,
  EditProfilePage,
  SettingsPage,
  LogoutPage,
} from "../../pages/protected-pages";

export const protectedRoutes = [
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
        path: "/protected-service",
        element: <ProtectedServicePage />,
      },
      {
        path: "/current-user",
        element: <CurrentUserPage />,
      },
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
];