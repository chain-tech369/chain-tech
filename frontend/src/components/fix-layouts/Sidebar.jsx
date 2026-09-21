import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="fixed min-h-screen w-64 border-r border-blue-900/40 bg-blue-950 p-6 text-white">
      <nav className="flex flex-col gap-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 font-medium transition ${
              isActive
                ? "bg-blue-800 text-yellow-400"
                : "text-slate-200 hover:bg-blue-900 hover:text-yellow-400"
            }`
          }
        >
          Dashboard
        </NavLink>

      </nav>
    </aside>
  );
}