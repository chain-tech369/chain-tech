import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Our services",
      path: "/services",
    },
    {
      name: "Contact us",
      path: "/contact",
    },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-blue-900/40
                 bg-blue-950/95 backdrop-blur-xl"
    >
      {/* =====================================================
          DESKTOP NAVBAR
      ===================================================== */}

      <nav
        className="mx-2 hidden max-w-7xl items-center
                   justify-between px-2 py-3
                   sm:px-6 lg:px-4 md:flex"
      >
        {/* ================= LOGO ================= */}

        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="https://res.cloudinary.com/dtz0urit6/image/upload/f_auto,q_auto/cloudinary-tools-uploads/wf7fm0ktdkg7czzauwo4"
            alt="Chain-Tech Logo"
            className="h-10 w-10 object-contain"
          />

          <div>
            <span
              className="block text-lg font-black
                         tracking-wide text-white"
            >
              CHAIN
              <span className="text-yellow-400">
                -TECH
              </span>
            </span>

            <span
              className="hidden text-[10px]
                         tracking-widest text-blue-300
                         sm:block"
            >
              DIGITAL TECHNOLOGY
            </span>
          </div>
        </NavLink>

        {/* ================= CENTER NAVIGATION ================= */}

        <div
          className="hidden items-center gap-8 md:flex"
        >
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

        {/* ================= RIGHT AUTH BUTTONS ================= */}

        <div
          className="hidden items-center gap-3 md:flex"
        >
          <NavLink
            to="/register"
            className="rounded-lg bg-yellow-400
                       px-4 py-2 text-sm font-semibold
                       text-slate-950 transition
                       hover:bg-yellow-300"
          >
            Sign Up
          </NavLink>

          <NavLink
            to="/login"
            className="rounded-lg border border-blue-500
                       px-4 py-2 text-sm font-semibold
                       text-slate-200 transition
                       hover:bg-blue-600"
          >
            Login
          </NavLink>
        </div>
      </nav>

      {/* =====================================================
          MOBILE NAVBAR
      ===================================================== */}

      <div className="md:hidden">
        {/* ================= MOBILE LOGO ROW ================= */}

        <div className="flex items-center justify-center px-4 py-4">
          <NavLink
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src="https://res.cloudinary.com/dtz0urit6/image/upload/f_auto,q_auto/cloudinary-tools-uploads/wf7fm0ktdkg7czzauwo4"
              alt="Chain-Tech Logo"
              className="h-10 w-10 object-contain"
            />

            <div>
              <span
                className="block text-lg font-black
                           tracking-wide text-white"
              >
                CHAIN
                <span className="text-yellow-400">
                  -TECH
                </span>
              </span>

              <span
                className="block text-[10px]
                           tracking-widest text-blue-300"
              >
                DIGITAL TECHNOLOGY
              </span>
            </div>
          </NavLink>
        </div>

        {/* ================= MOBILE SECOND ROW ================= */}

        <div
          className="flex items-center justify-between
                     border-t border-blue-900/40
                     px-4 py-3"
        >
          {/* MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2
                       rounded-lg border border-blue-800
                       px-3 py-2 text-sm
                       font-medium text-slate-200"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
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

            Menu
          </button>

          {/* SIGN UP + LOGIN */}

          <div className="flex items-center gap-2">
            <NavLink
              to="/register"
              className="rounded-lg bg-yellow-400
                         px-3 py-2 text-sm
                         font-semibold text-slate-950
                         transition hover:bg-yellow-300"
            >
              Sign Up
            </NavLink>

            <NavLink
              to="/login"
              className="rounded-lg border border-blue-500
                         px-3 py-2 text-sm
                         font-semibold text-slate-200
                         transition hover:bg-blue-600"
            >
              Login
            </NavLink>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {menuOpen && (
          <div
            className="border-t border-blue-900/40
                       bg-blue-950"
          >
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
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}