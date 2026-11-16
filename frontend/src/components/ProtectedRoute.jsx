import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from "../utils/permission";

export default function ProtectedRoute({
  permission,
  permissions = [],
  requireAll = false,
}) {
  const user = useSelector((state) => state.auth.user);

  // Require authentication
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userPermissions = user.permissions ?? [];

  // Authenticated-only route: no permission requirement
  if (!permission && permissions.length === 0) {
    return <Outlet />;
  }

  let authorized = false;

  if (permission) {
    authorized = hasPermission(userPermissions, permission);
  } else {
    authorized = requireAll
      ? hasAllPermissions(userPermissions, permissions)
      : hasAnyPermission(userPermissions, permissions);
  }

  if (!authorized) {
    return <Navigate to="/protected-home" replace />;
  }

  return <Outlet />;
}