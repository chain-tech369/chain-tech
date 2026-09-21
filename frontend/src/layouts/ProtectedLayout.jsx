import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedNavbar from "../components/fix-layouts/ProtectedNavbar";
import Sidebar from "../components/fix-layouts/Sidebar";

export default function ProtectedLayout() {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Not authenticated → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → show protected application
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Protected Navbar */}
      <ProtectedNavbar />

      

        {/* Protected Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    
  );
}