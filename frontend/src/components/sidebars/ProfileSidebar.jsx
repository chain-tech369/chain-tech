import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ProfileSidebar({ currentUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get the logged-in user's first name
  const firstName = currentUser?.first_name || "";

  // Get the first letter dynamically
  const initial = firstName.charAt(0).toUpperCase();

  // Get full name dynamically
  const fullName =
    `${currentUser?.first_name || ""} ${
      currentUser?.last_name || ""
    }`.trim();

  const navItems = [
    {
      name: "Account Dashboard",
      path: "/account-dashboard",
      icon: "▦",
    },
    {
      name: "Edit Account",
      path: "/account/edit",
      icon: "◉",
    },
    {
      name: "Edit Profile",
      path: "/profile/edit",
      icon: "✎",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-5 left-5 z-[70]
                   flex h-11 w-11 items-center justify-center
                   rounded-full bg-blue-950
                   text-white shadow-lg
                   transition hover:bg-blue-800
                   lg:hidden"
      >
        {sidebarOpen ? "×" : "☰"}
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-blue-900
          bg-blue-950
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center border-b border-blue-900 px-6">
          <div>
            <h1 className="text-xl font-black text-white">
              CHAIN
              <span className="text-yellow-400">
                -TECH
              </span>
            </h1>

            <p className="mt-1 text-[10px] tracking-widest text-blue-400">
              ACCOUNT CENTER
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-blue-400">
            Account
          </p>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-blue-200 hover:bg-blue-900"
                }`
              }
            >
              <span className="w-5 text-center">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Logout */}
          <div className="mt-8 border-t border-blue-900 pt-6">
            <NavLink
              to="/logout"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-950"
            >
              <span className="w-5 text-center">
                ↪
              </span>

              <span>Logout</span>
            </NavLink>
          </div>
        </nav>

        {/* Current user */}
        <div className="shrink-0 border-t border-blue-900 p-4">
          <div className="flex items-center gap-3">

            {/* Dynamic avatar */}
            <NavLink
              to="/current-user"
              onClick={() => setSidebarOpen(false)}
              className="flex h-10 w-10 shrink-0
                         items-center justify-center
                         rounded-full
                         bg-yellow-400
                         font-bold
                         text-slate-950
                         transition
                         hover:ring-2
                         hover:ring-yellow-400
                         hover:ring-offset-2
                         hover:ring-offset-blue-950"
            >
              <span className="text-base font-bold">
                {initial}
              </span>
            </NavLink>

            {/* Dynamic name */}
            <div className="min-w-0">
              <NavLink
                to="/current-user"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `block truncate text-sm font-semibold transition ${
                    isActive
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`
                }
              >
                {fullName}
              </NavLink>
            </div>

          </div>
        </div>
      </aside>
    </>
  );
}