import {
  Outlet,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ProfileSide from "../components/sidebars/ProfileSidebar";

import {
  fetchProfile,
} from "../actions/profileActions";

export default function ProfileLayout() {
  // ==========================================
  // DISPATCH
  // ==========================================

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
    loading,
    error,
  } = useSelector(
    (state) => state.profile
  );

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  useEffect(() => {
    if (
      currentUser?.id &&
      !profile
    ) {
      dispatch(
        fetchProfile(
          currentUser.id
        )
      );
    }
  }, [
    currentUser?.id,
    profile,
    dispatch,
  ]);

  // ==========================================
  // PROFILE LAYOUT
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          PROFILE SIDEBAR
      ====================================== */}

      <ProfileSide
        currentUser={currentUser}
      />

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="min-h-screen lg:ml-72">

        {/* ====================================
            LOADING
        ==================================== */}

        {loading && !profile ? (
          <div className="flex min-h-screen items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-950" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading profile...
              </p>

            </div>

          </div>
        ) : error && !profile ? (
          /* ====================================
             ERROR
          ==================================== */

          <div className="flex min-h-screen items-center justify-center px-6">

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

              <h2 className="font-semibold text-red-800">
                Unable to load profile
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

            </div>

          </div>
        ) : (
          /* ====================================
             PROFILE PAGES
          ==================================== */

          <Outlet />
        )}

      </main>

    </div>
  );
}