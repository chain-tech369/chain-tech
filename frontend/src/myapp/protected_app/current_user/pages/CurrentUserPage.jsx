import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentUser } from "../../actions/CurrentUserActions";

export default function CurrentUserPage() {
  const dispatch = useDispatch();

  const {
    currentUser,
    loading,
    error,
  } = useSelector((state) => state.user);

  // ==========================================
  // FETCH CURRENT USER
  // ==========================================

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, currentUser]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading && !currentUser) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-950" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !currentUser) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
                <span className="text-lg font-bold text-red-600">
                  !
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Unable to load your account
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  We could not retrieve your current user
                  information.
                </p>

                <p className="mt-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // NO USER
  // ==========================================

  if (!currentUser) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-200">
            <span className="text-xl font-bold text-slate-500">
              ?
            </span>
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            No user information
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            There is currently no logged-in user information
            available.
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // USER INFORMATION
  // ==========================================

  const firstName =
    currentUser.first_name || "";

  const lastName =
    currentUser.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    "User";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase() || "U";

  const role =
    currentUser.role?.name ||
    currentUser.role_name ||
    "User";

  const isActive =
    currentUser.is_active;

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-5xl">

        {/* ======================================
            PAGE HEADER
        ====================================== */}

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
            Current User
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            View the account information associated with
            your current Chain-Tech session.
          </p>
        </div>

        {/* ======================================
            PROFILE HEADER CARD
        ====================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Top banner */}

          <div className="h-28 bg-blue-950 sm:h-36" />

          {/* Identity */}

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              {/* Avatar + Name */}

              <div className="flex items-end gap-4">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-yellow-400 text-2xl font-bold text-blue-950 shadow-md sm:h-28 sm:w-28 sm:text-3xl">
                  {initials}
                </div>

                <div className="pb-1">

                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {fullName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {currentUser.email || "No email"}
                  </p>

                </div>

              </div>

              {/* Status */}

              <div className="pb-1">

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isActive
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                  />

                  {isActive
                    ? "Active Account"
                    : "Inactive Account"}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ======================================
            USER INFORMATION
        ====================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">

            <h2 className="text-lg font-bold text-slate-900">
              User Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Basic information associated with your account.
            </p>

          </div>

          <div className="grid gap-px bg-slate-200 sm:grid-cols-2">

            {/* First Name */}

            <UserInfo
              label="First Name"
              value={currentUser.first_name}
            />

            {/* Last Name */}

            <UserInfo
              label="Last Name"
              value={currentUser.last_name}
            />

            {/* Email */}

            <UserInfo
              label="Email Address"
              value={currentUser.email}
            />

            {/* User ID */}

            <UserInfo
              label="User ID"
              value={currentUser.id}
              mono
            />

            {/* Role */}

            <UserInfo
              label="Role"
              value={role}
            />

            {/* Account Status */}

            <UserInfo
              label="Account Status"
              value={
                isActive
                  ? "Active"
                  : "Inactive"
              }
            />

          </div>

        </section>

        {/* ======================================
            SESSION INFORMATION
        ====================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Account Access
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your account is currently connected to the
                Chain-Tech application.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Role
              </p>

              <p className="mt-1 text-sm font-bold text-blue-950">
                {role}
              </p>
            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


// ==========================================
// USER INFORMATION COMPONENT
// ==========================================

function UserInfo({
  label,
  value,
  mono = false,
}) {
  return (
    <div className="bg-white px-6 py-5 sm:px-8">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 break-words text-sm font-semibold text-slate-900 sm:text-base ${
          mono
            ? "font-mono text-xs sm:text-sm"
            : ""
        }`}
      >
        {value || "N/A"}
      </p>

    </div>
  );
}