import { createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./public_routes/Public_Router";
import { protectedRoutes } from "./protected_routes/Protected_Router";
import { adminRoutes } from "./admin_routes/Admin_Router";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  ...adminRoutes,
]);