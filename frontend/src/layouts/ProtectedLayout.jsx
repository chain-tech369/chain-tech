import {
  Navigate,
  Outlet,
  useLoaderData,
} from "react-router-dom";

import { useSelector } from "react-redux";

import ProtectedNavbar from "../components/navbars/ProtectedNavbar";

export default function ProtectedLayout() {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Get the current logged-in user
  const currentUser = useLoaderData();

  // Not authenticated → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → show protected application
  return (
    <div className="min-h-screen bg-slate-950">
      
      {/* Protected Navbar */}
      <ProtectedNavbar
        currentUser={currentUser}
      />

      {/* Protected Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
}