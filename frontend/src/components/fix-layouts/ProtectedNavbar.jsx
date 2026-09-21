import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ProtectedNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Our services",
      path: "/service",
    },
    {
      name: "Service request",
      path: "/service-request",
    },
  ];

  const profileImage =
    "https://res.cloudinary.com/dtz0urit6/image/upload/f_auto,q_auto/cloudinary-tools-uploads/wf7fm0ktdkg7czzauwo4";

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/40 bg-blue-950/95 backdrop-blur-xl">
      {/* =====================================================
          DESKTOP NAVBAR
      ===================================================== */}

      <nav className="mx-2 hidden max-w-7xl items-center justify-between px-2 py-3 sm:px-6 lg:px-4 md:flex">
        {/* ================= LOGO ================= */}

        <NavLink to="/home" className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="Chain-Tech Logo"
            className="h-10 w-10 object-contain"
          />

          <div>
            <span className="block text-lg font-black tracking-wide text-white">
              CHAIN
              <span className="text-yellow-400">-TECH</span>
            </span>

            <span className="hidden text-[10px] tracking-widest text-blue-300 sm:block">
              DIGITAL TECHNOLOGY
            </span>
          </div>
        </NavLink>

        {/* ================= CENTER NAVIGATION ================= */}

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-yellow-400"
                    : "text-slate-300 hover:text-yellow-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="hidden items-center gap-3 md:flex">
          {/* JOIN US */}

          <NavLink
            to="/join-us"
            className={({ isActive }) =>
              `rounded-lg border border-blue-500 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-blue-600 ${
                isActive ? "text-yellow-400" : ""
              }`
            }
          >
            Join Us
          </NavLink>

          {/* ================= PROFILE BUTTON ================= */}

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              title="Account menu"
              aria-label="Account menu"
              aria-expanded={profileOpen}
              className={`block h-10 w-10 overflow-hidden rounded-full border-2 border-amber-400 transition hover:scale-105 ${
                profileOpen
                  ? "ring-2 ring-yellow-300 ring-offset-2 ring-offset-blue-950"
                  : ""
              }`}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </button>

            {/* ================= PROFILE MENU ================= */}

            {profileOpen && (
              <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-blue-800 bg-blue-950 shadow-2xl">
                {/* USER HEADER */}

                <div className="border-b border-blue-800 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-11 w-11 rounded-full border-2 border-amber-400 object-cover"
                    />

                    <div>
                      <p className="font-semibold text-white">
                        David Kuron
                      </p>

                      <p className="text-xs text-blue-300">
                        My Account
                      </p>
                    </div>
                  </div>
                </div>

                {/* MENU ITEMS */}

                <div className="p-2">
                  <NavLink
                    to="/account-dashboard"
                    onClick={() => setProfileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-800 text-yellow-400"
                          : "text-slate-200 hover:bg-blue-900"
                      }`
                    }
                  >
                    Account Dashboard
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-800 text-yellow-400"
                          : "text-slate-200 hover:bg-blue-900"
                      }`
                    }
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/account/edit"
                    onClick={() => setProfileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-800 text-yellow-400"
                          : "text-slate-200 hover:bg-blue-900"
                      }`
                    }
                  >
                    Edit Account
                  </NavLink>

                  <NavLink
                    to="/profile/edit"
                    onClick={() => setProfileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-800 text-yellow-400"
                          : "text-slate-200 hover:bg-blue-900"
                      }`
                    }
                  >
                    Edit Profile
                  </NavLink>

                  <NavLink
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-800 text-yellow-400"
                          : "text-slate-200 hover:bg-blue-900"
                      }`
                    }
                  >
                    Settings
                  </NavLink>
                </div>

                {/* LOGOUT */}

                <div className="border-t border-blue-800 p-2">
                  <NavLink
                    to="/logout"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-950"
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE NAVBAR
      ===================================================== */}

      <div className="md:hidden">
        {/* =================================================
            MOBILE NAVBAR 1
            LOGO ONLY
        ================================================= */}

        <div className="flex items-center justify-center px-4 py-4">
          <NavLink
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <img
              src={profileImage}
              alt="Chain-Tech Logo"
              className="h-10 w-10 object-contain"
            />

            <div>
              <span className="block text-lg font-black tracking-wide text-white">
                CHAIN
                <span className="text-yellow-400">-TECH</span>
              </span>

              <span className="block text-[10px] tracking-widest text-blue-300">
                DIGITAL TECHNOLOGY
              </span>
            </div>
          </NavLink>
        </div>

        {/* =================================================
            MOBILE NAVBAR 2
            MENU + JOIN US + LOGOUT + PROFILE
        ================================================= */}

        <div className="flex items-center justify-between border-t border-blue-900/40 px-4 py-3">
          {/* MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-lg border border-blue-800 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-blue-900"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}

            {menuOpen ? "Close" : "Menu"}
          </button>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-2">
            {/* JOIN US */}

            <NavLink
              to="/join-us"
              className={({ isActive }) =>
                `rounded-lg border border-blue-500 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-blue-600 ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
            >
              Join Us
            </NavLink>

            {/* LOGOUT */}

            <NavLink
              to="/logout"
              className="rounded-lg border border-red-500 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-red-600"
            >
              Logout
            </NavLink>

            {/* PROFILE BUTTON */}

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                title="Account menu"
                aria-label="Account menu"
                aria-expanded={profileOpen}
                className={`block h-9 w-9 overflow-hidden rounded-full border-2 border-amber-400 transition ${
                  profileOpen
                    ? "ring-2 ring-yellow-300 ring-offset-2 ring-offset-blue-950"
                    : ""
                }`}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </button>

              {/* MOBILE PROFILE MENU */}

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-xl border border-blue-800 bg-blue-950 shadow-2xl">
                  {/* USER HEADER */}

                  <div className="border-b border-blue-800 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border-2 border-amber-400 object-cover"
                      />

                      <div>
                        <p className="font-semibold text-white">
                          David Kuron
                        </p>

                        <p className="text-xs text-blue-300">
                          My Account
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MENU ITEMS */}

                  <div className="p-2">
                    <NavLink
                      to="/account-dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-blue-900"
                    >
                      Account Dashboard
                    </NavLink>

                    <NavLink
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-blue-900"
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      to="/account/edit"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-blue-900"
                    >
                      Edit Account
                    </NavLink>

                    <NavLink
                      to="/profile/edit"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-blue-900"
                    >
                      Edit Profile
                    </NavLink>

                    <NavLink
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-blue-900"
                    >
                      Settings
                    </NavLink>
                  </div>

                  {/* LOGOUT */}

                  <div className="border-t border-blue-800 p-2">
                    <NavLink
                      to="/logout"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-950"
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (
          <div className="border-t border-blue-900/40 bg-blue-950">
            <div className="px-4 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 transition ${
                        isActive
                          ? "bg-blue-900 text-yellow-400"
                          : "text-slate-200 hover:bg-blue-900"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* DASHBOARD */}

                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 transition ${
                      isActive
                        ? "bg-blue-900 text-yellow-400"
                        : "text-slate-200 hover:bg-blue-900"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}