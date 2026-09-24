import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ProtectedNavbar from "../components/navbars/ProtectedNavbar";
import ProtectedFooter from "../components/footers/ProtectedFooter";

import {
  fetchCurrentUser,
} from "../actions/CurrentUserActions";

export default function ProtectedLayout() {
  const dispatch = useDispatch();

  // ==========================================
  // AUTH STATE
  // ==========================================

  const {
    isAuthenticated,
  } = useSelector(
    (state) => state.auth
  );

  // ==========================================
  // CURRENT USER STATE
  // ==========================================

  const {
    currentUser,
    loading,
    error,
  } = useSelector(
    (state) => state.user
  );

  // ==========================================
  // RESTORE CURRENT USER AFTER REFRESH
  // ==========================================

  useEffect(() => {
    if (
      isAuthenticated &&
      !currentUser
    ) {
      dispatch(
        fetchCurrentUser()
      );
    }
  }, [
    isAuthenticated,
    currentUser,
    dispatch,
  ]);

  // ==========================================
  // NOT AUTHENTICATED
  // ==========================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==========================================
  // LOADING CURRENT USER
  // ==========================================

  if (
    loading &&
    !currentUser
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p>
          Loading user...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (
    error &&
    !currentUser
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-red-400">
          {error}
        </p>
      </div>
    );
  }

  // ==========================================
  // PROTECTED APPLICATION
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-950">

      {/* ======================================
          PROTECTED NAVBAR
      ====================================== */}

      <ProtectedNavbar
        currentUser={currentUser}
      />

      {/* ======================================
          PROTECTED PAGE CONTENT
      ====================================== */}

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ======================================
          FOOTER
      ====================================== */}

      <ProtectedFooter />

    </div>
  );
}