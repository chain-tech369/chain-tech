import { NavLink } from "react-router-dom";

// =====================================================
// PROTECTED FOOTER
// =====================================================

export default function ProtectedFooter() {
  return (
    <footer className="border-t border-slate-800 bg-blue-950">

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* =====================================================
              COMPANY
          ===================================================== */}

          <div>

            <h2 className="text-xl font-black text-white">
              CHAIN
              <span className="text-yellow-400">
                -TECH
              </span>
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-7 text-blue-200">
              Building secure, scalable and innovative
              digital solutions for the future.
            </p>

          </div>

          {/* =====================================================
              ACCOUNT
          ===================================================== */}

          <div>

            <h3 className="font-bold text-white">
              My Account
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-blue-200">

              <li>
                <NavLink
                  to="/protected-home"
                  className="transition hover:text-yellow-400"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/account-dashboard"
                  className="transition hover:text-yellow-400"
                >
                  Account Dashboard
                </NavLink>
              </li>

            </ul>

          </div>

          {/* =====================================================
              SERVICES
          ===================================================== */}

          <div>

            <h3 className="font-bold text-white">
              Services
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-blue-200">

              <li>
                <NavLink
                  to="/protected-services"
                  className="transition hover:text-yellow-400"
                >
                  Our Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/service-request"
                  className="transition hover:text-yellow-400"
                >
                  Request a Service
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/join-us"
                  className="transition hover:text-yellow-400"
                >
                  Join Us
                </NavLink>
              </li>

            </ul>

          </div>

          {/* =====================================================
              CONNECT
          ===================================================== */}

          <div>

            <h3 className="font-bold text-white">
              Connect
            </h3>

            <div className="mt-5 flex gap-3">

              {/* GITHUB */}

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-sm text-white transition hover:bg-blue-700"
              >
                GH
              </a>

              {/* LINKEDIN */}

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-sm text-white transition hover:bg-blue-700"
              >
                IN
              </a>

              {/* EMAIL */}

              <a
                href="mailto:info@chain-tech.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-sm text-white transition hover:bg-blue-700"
              >
                @
              </a>

            </div>

          </div>

        </div>

        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <div className="mt-12 flex flex-col gap-4 border-t border-blue-900 pt-6 text-sm text-blue-300 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Chain-Tech. All rights reserved.
          </p>

          <div className="flex gap-5">

            <NavLink
              to="/privacy"
              className="transition hover:text-yellow-400"
            >
              Privacy
            </NavLink>

            <NavLink
              to="/terms"
              className="transition hover:text-yellow-400"
            >
              Terms
            </NavLink>

          </div>

        </div>

      </div>

    </footer>
  );
}