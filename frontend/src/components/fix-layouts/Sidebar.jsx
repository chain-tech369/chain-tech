import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-950 text-white p-6">
      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 font-medium transition ${
              isActive
                ? "bg-blue-800"
                : "hover:bg-blue-900"
            }`
          }
        >
          Dashboard
        </NavLink>
      </nav>
    </aside>
  );
}