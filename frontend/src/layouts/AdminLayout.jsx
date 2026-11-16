import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import AdminSidebar from "../components/sidebars/AdminSidebar";

export default function AdminLayout() {
  const { user, authInitialized } = useSelector(
    (state) => state.auth
  );

  // Wait until authentication is initialized
  if (!authInitialized) {
    return <div className="p-6">Loading account...</div>;
  }

  // Check authentication
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check administrator role
  const roleName =
    typeof user.role === "string"
      ? user.role
      : user.role?.name;

  const isAdmin = roleName?.toLowerCase() === "admin";

  if (!isAdmin) {
    return <Navigate to="/protected-home" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}