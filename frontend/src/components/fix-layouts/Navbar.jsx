import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
    { name: "Our services", path: "/services" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/40 bg-blue-950/95 backdrop-blur-xl">

      {/* =================================
          DESKTOP NAVBAR
      ================================= */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8 md:py-5">

        {/* =========================
            LOGO
        ========================== */}
        <div className="justify-self-start">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <div className="text-left">
              <span className="block text-2xl font-black tracking-wide text-white">
                CHAIN<span className="text-blue-400">-TECH</span>
              </span>

              <span className="block text-[10px] font-bold tracking-widest text-yellow-400 ml-4">
                DIGITAL TECHNOLOGY
              </span>
            </div>
          </NavLink>
        </div>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <nav className="flex items-center justify-center gap-2 whitespace-nowrap">

          {navItems.map((item, index) => (
            <div
              key={item.path}
              className="flex items-center"
            >
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `px-3 text-2xl font-bold whitespace-nowrap transition ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-200 hover:text-blue-400"
                  }`
                }
              >
                {item.name}
              </NavLink>

              {index < navItems.length - 1 && (
                <div className="h-9 w-px shrink-0 bg-blue-800" />
              )}
            </div>
          ))}

        </nav>

        {/* =========================
            DESKTOP LOGIN
        ========================== */}
        <div className="justify-self-end">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "rounded-lg bg-blue-500 px-6 py-3 text-2xl font-bold text-white transition hover:bg-blue-400"
                : "rounded-lg bg-yellow-400 px-6 py-3 text-2xl font-bold text-blue-950 transition hover:bg-yellow-300"
            }
          >
            Login
          </NavLink>
        </div>

      </div>

      {/* =================================
          MOBILE TOP LOGO
      ================================= */}
      <div className="px-6 py-4 md:hidden">

        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          <div className="text-center">
            <span className="block text-xl font-black tracking-wide text-white">
              CHAIN<span className="text-yellow-400">-TECH</span>
            </span>

            <span className="block text-[8px] tracking-widest text-yellow-400 uppercase">
              DIGITAL services
            </span>
          </div>
        </NavLink>

      </div>

      {/* =================================
          MOBILE SECOND NAVBAR
      ================================= */}
      <div className="flex items-center justify-between gap-4 border-t border-blue-900/40 px-6 py-3 md:hidden">

        {/* Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="flex items-center gap-2 font-bold text-white transition hover:text-blue-400"
        >
          <span className="text-xl">
            {menuOpen ? "✕" : "☰"}
          </span>

          <span>
            {menuOpen ? "Close" : "Menu"}
          </span>
        </button>

        {/* Mobile Login */}
        <NavLink
          to="/login"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "rounded-lg bg-blue-500 px-5 py-2 font-bold text-white transition hover:bg-blue-400"
              : "rounded-lg bg-yellow-400 px-5 py-2 font-bold text-blue-950 transition hover:bg-yellow-300"
          }
        >
          Login
        </NavLink>

      </div>

      {/* =================================
          MOBILE MENU
      ================================= */}
      {menuOpen && (
        <nav className="border-t border-blue-900/40 bg-blue-950 px-6 py-4 md:hidden">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block border-b border-blue-900/40 py-4 text-lg font-bold transition last:border-b-0 ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-200 hover:text-blue-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        </nav>
      )}

    </header>
  );
}