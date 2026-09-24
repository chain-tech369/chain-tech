import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { NavLink } from "react-router-dom";

import UserAvatar from "../../components/uis/UserAvatar";

import {
  fetchProfile,
} from "../../actions/profileActions";

export default function AccountDashboardPage() {
  const dispatch = useDispatch();

  // ==========================================
  // CURRENT USER FROM REDUX
  // ==========================================

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  // ==========================================
  // PROFILE FROM REDUX
  // ==========================================

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useSelector(
    (state) => state.profile
  );

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(
        fetchProfile(
          currentUser.id
        )
      );
    }
  }, [
    currentUser?.id,
    dispatch,
  ]);

  // ==========================================
  // USER INFORMATION
  // ==========================================

  const firstName =
    currentUser?.first_name || "";

  const lastName =
    currentUser?.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    "User";

  const email =
    currentUser?.email ||
    "Not provided";

  const userId =
    currentUser?.id ||
    "Not provided";

  const role =
    currentUser?.role?.name ||
    currentUser?.role ||
    "User";

  const isActive =
    currentUser?.is_active;

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-6xl">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <header className="mb-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-600">
                My Account
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                Account Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage and review your Chain-Tech account
                information and personal profile.
              </p>

            </div>

            {/* =================================
                BACK TO HOME
            ================================== */}

            <NavLink
              to="/protected-home"
              className="inline-flex items-center justify-center rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
            >
              Back to Home
            </NavLink>

          </div>

        </header>

        {/* =====================================
            PROFILE HEADER
        ====================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* BLUE BANNER */}

          <div className="h-28 bg-blue-950 sm:h-36" />

          {/* PROFILE INFORMATION */}

          <div className="px-6 pb-7 sm:px-8 sm:pb-8">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-end gap-4">

                <UserAvatar
                  currentUser={{
                    ...currentUser,
                    profile_image:
                      profile?.profile_image,
                  }}
                  size="h-24 w-24 sm:h-28 sm:w-28"
                />

                <div className="pb-1">

                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {fullName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {email}
                  </p>

                </div>

              </div>

              {/* ACCOUNT STATUS */}

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

        {/* =====================================
            USER INFORMATION
        ====================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  User Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Basic information associated with your account.
                </p>

              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-blue-50 sm:flex">

                <span className="font-bold text-blue-950">
                  U
                </span>

              </div>

            </div>

          </div>

          <div className="grid gap-px bg-slate-200 sm:grid-cols-2">

            <InfoCard
              label="First Name"
              value={firstName}
            />

            <InfoCard
              label="Last Name"
              value={lastName}
            />

            <InfoCard
              label="Email Address"
              value={email}
            />

            <InfoCard
              label="User ID"
              value={userId}
              mono
            />

            <InfoCard
              label="Role"
              value={role}
            />

            <InfoCard
              label="Account Status"
              value={
                isActive
                  ? "Active"
                  : "Inactive"
              }
            />

          </div>

        </section>

        {/* =====================================
            PROFILE INFORMATION
        ====================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">

            <h2 className="text-lg font-bold text-slate-900">
              Profile Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your personal information and profile details.
            </p>

          </div>

          {/* PROFILE LOADING */}

          {profileLoading && (
            <div className="flex items-center justify-center px-6 py-12">

              <div className="text-center">

                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-950" />

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Loading profile...
                </p>

              </div>

            </div>
          )}

          {/* PROFILE ERROR */}

          {!profileLoading &&
            profileError && (
              <div className="px-6 py-8 sm:px-8">

                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                  <h3 className="font-semibold text-red-800">
                    Unable to load profile
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-red-600">
                    {profileError}
                  </p>

                </div>

              </div>
            )}

          {/* PROFILE DATA */}

          {!profileLoading &&
            !profileError && (
              <div className="grid gap-px bg-slate-200 sm:grid-cols-2">

                <InfoCard
                  label="Phone Number"
                  value={profile?.phone}
                />

                <InfoCard
                  label="Address"
                  value={profile?.address}
                />

                {/* PROFILE IMAGE */}

                <div className="bg-white px-6 py-5 sm:px-8">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Profile Image
                  </p>

                  {profile?.profile_image ? (
                    <div className="mt-3 flex items-center gap-4">

                      <img
                        src={profile.profile_image}
                        alt={`${fullName} profile`}
                        className="h-14 w-14 rounded-xl object-cover ring-2 ring-slate-100"
                      />

                      <p className="max-w-xs break-all text-xs text-slate-500">
                        {profile.profile_image}
                      </p>

                    </div>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-slate-400">
                      Not provided
                    </p>
                  )}

                </div>

                {/* BIOGRAPHY */}

                <div className="bg-white px-6 py-5 sm:col-span-2 sm:px-8">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Biography
                  </p>

                  <div className="mt-3 rounded-2xl bg-slate-50 p-5">

                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                      {profile?.bio ||
                        "No biography has been provided yet."}
                    </p>

                  </div>

                </div>

              </div>
            )}

        </section>

        {/* =====================================
            STATISTICS
        ====================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <StatCard
            label="Account"
            value={
              isActive
                ? "Active"
                : "Inactive"
            }
            description="Current account status"
          />

          <StatCard
            label="Role"
            value={role}
            description="Assigned account role"
          />

          <StatCard
            label="Profile"
            value={
              profile
                ? "Complete"
                : "Pending"
            }
            description="Profile information"
          />

        </section>

      </div>

    </main>
  );
}

// ==========================================
// INFO CARD
// ==========================================

function InfoCard({
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
        className={`mt-2 break-words font-semibold text-slate-900 ${
          mono
            ? "font-mono text-xs"
            : "text-sm sm:text-base"
        }`}
      >
        {value || "Not provided"}
      </p>

    </div>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function StatCard({
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-blue-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}