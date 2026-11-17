import {
  HomePage,
  AboutPage,
  ContactPage,
  ServicePage,
} from "../../pages/public-pages";

import PublicLayout from "../../layouts/PublicLayout";

export const publicRoutes = [
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
    ],
  },
];