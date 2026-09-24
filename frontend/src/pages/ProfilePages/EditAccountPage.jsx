import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import UserAccountForm from "../../components/forms/UserAccountForm";

import {
  editUser,
} from "../../actions/CurrentUserActions";

import UserAvatar from "../../components/uis/UserAvatar";

export default function EditAccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================
  // CURRENT USER FROM REDUX
  // ==========================================

  const {
    currentUser,
    updating,
    error,
  } = useSelector(
    (state) => state.user
  );

  // ==========================================
  // SAVE ACCOUNT
  // ==========================================

  const handleSave = async (userData) => {
    if (!currentUser?.id) {
      throw new Error(
        "User information is not available."
      );
    }

    await dispatch(
      editUser(
        currentUser.id,
        userData
      )
    );
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {
    navigate("/account-dashboard");
  };

  // ==========================================
  // FULL NAME
  // ==========================================

  const fullName =
    `${currentUser?.first_name || ""} ${
      currentUser?.last_name || ""
    }`.trim() || "User";

  const email =
    currentUser?.email || "No email available";

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
                Edit Account
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Update your account information and
                manage your personal account details.
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
                  currentUser={currentUser}
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
                    currentUser?.is_active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >

                  <span
                    className={`h-2 w-2 rounded-full ${
                      currentUser?.is_active
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                  />

                  {currentUser?.is_active
                    ? "Active Account"
                    : "Inactive Account"}

                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================
            EDIT ACCOUNT SECTION
        ====================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* SECTION HEADER */}

          <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Account Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your name, email address,
                or password.
              </p>

            </div>

            <NavLink
              to="/account-dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Dashboard
            </NavLink>

          </div>

          {/* FORM */}

          <div className="px-6 py-6 sm:px-8 sm:py-8">

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">

                <p className="text-sm font-semibold text-red-800">
                  Unable to update account
                </p>

                <p className="mt-1 text-sm leading-6 text-red-600">
                  {typeof error === "string"
                    ? error
                    : error?.msg ||
                      error?.detail ||
                      "Something went wrong."}
                </p>

              </div>
            )}

            {currentUser ? (
              <UserAccountForm
                user={currentUser}
                onSave={handleSave}
                onCancel={handleCancel}
                updating={updating}
                error={null}
              />
            ) : (
              <div className="flex items-center justify-center py-12">

                <div className="text-center">

                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-950" />

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Loading account information...
                  </p>

                </div>

              </div>
            )}

          </div>

        </section>

        {/* =====================================
            INFORMATION CARDS
        ====================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <InfoCard
            label="Account"
            value={
              currentUser?.is_active
                ? "Active"
                : "Inactive"
            }
            description="Current account status"
          />

          <InfoCard
            label="Role"
            value={
              currentUser?.role?.name ||
              currentUser?.role ||
              "User"
            }
            description="Assigned account role"
          />

          <InfoCard
            label="User ID"
            value={
              currentUser?.id ||
              "Not available"
            }
            description="Unique account identifier"
          />

        </section>

      </div>

    </main>
  );
}

// ==========================================
// INFORMATION CARD
// ==========================================

function InfoCard({
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