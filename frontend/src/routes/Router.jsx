import { createBrowserRouter } from "react-router-dom";

import {
  HomePage,
  AboutPage,
  ContactPage,
  ServicePage,
} from "../pages/public-pages/index";
import PublicLayout from "../layouts/PublicLayout";

import {
  LoginPage,
  RegisterPage,
} from "../pages/user-pages/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "services",
        element: <ServicePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);