import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import UserAccountForm from "../../components/forms/UserAccountForm";
import { editUser } from "../../actions/userActions";

export default function EditAccountPage() {
  const dispatch = useDispatch();

  // ==========================================
  // GET USER STATE
  // ==========================================

  const userState = useSelector(
    (state) => state.user
  );

  const currentUser = userState?.currentUser || null;
  const updating = userState?.updating || false;
  const error = userState?.error || null;

  // ==========================================
  // SAVE ACCOUNT
  // ==========================================

  const handleSave = async (userData) => {
    if (!currentUser?.id) {
      throw new Error(
        "User information is not available."
      );
    }

    /*
     * Backend route:
     *
     * PUT /users/{user_id}
     *
     * Example:
     * PUT /users/1
     */

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
    window.history.back();
  };

  // ==========================================
  // LOADING USER
  // ==========================================

  if (!currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-950" />

          <p className="text-sm text-slate-600">
            Loading account information...
          </p>

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ========================================
            PAGE HEADER
        ======================================== */}

        <div className="mb-8">

          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-500">
            My Account
          </p>

          <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl">
            Edit Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Update your account information.
          </p>

        </div>

        {/* ========================================
            FORM CARD
        ======================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

          {/* ========================================
              CARD HEADER
          ======================================== */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold text-blue-950">
                Account Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your name, email address, or password.
              </p>

            </div>

            <NavLink
              to="/profile/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Dashboard
            </NavLink>

          </div>

          {/* ========================================
              REDUX ERROR
          ======================================== */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* ========================================
              FORM
          ======================================== */}

          <UserAccountForm
            user={currentUser}
            onSave={handleSave}
            onCancel={handleCancel}
          />

          {/* ========================================
              UPDATING MESSAGE
          ======================================== */}

          {updating && (
            <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Updating your account...
            </div>
          )}

        </div>

      </div>

    </main>
  );
}