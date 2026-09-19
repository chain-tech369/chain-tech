import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/fix-layouts/Sidebar";

export default function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}