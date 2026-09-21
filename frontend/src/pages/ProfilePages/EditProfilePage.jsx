import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import ProfileForm from "../../components/forms/ProfileForm";

import { fetchCurrentUser } from "../../actions/userActions";

import {
  fetchProfile,
  editProfile,
} from "../../actions/profileActions";

export default function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================
  // USER STATE
  // ==========================================

  const userState = useSelector(
    (state) => state.user
  );

  const currentUser = userState?.currentUser;

  // ==========================================
  // PROFILE STATE
  // ==========================================

  const profileState = useSelector(
    (state) => state.profile
  );

  const profile = profileState?.profile;
  const loading = profileState?.loading || false;
  const error = profileState?.error || null;

  // ==========================================
  // LOAD CURRENT USER
  // ==========================================

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [currentUser, dispatch]);

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchProfile(currentUser.id));
    }
  }, [currentUser?.id, dispatch]);

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async (profileData) => {
    if (!currentUser?.id) {
      throw new Error(
        "User information is not available."
      );
    }

    await dispatch(
      editProfile(
        currentUser.id,
        profileData
      )
    );

    navigate("/profile");
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {
    navigate("/profile");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (!currentUser || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">
            Loading profile information...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !profile) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error?.msg ||
          "Failed to load profile.";

    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-lg font-bold text-red-700">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {errorMessage}
          </p>

          <NavLink
            to="/profile/dashboard"
            className="mt-6 inline-flex rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Profile Dashboard
          </NavLink>
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

        {/* HEADER */}

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-500">
            My Profile
          </p>

          <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl">
            Edit Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Update your profile information.
          </p>
        </div>

        {/* CARD */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

          {/* CARD HEADER */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-blue-950">
                Profile Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your phone, address, bio, and profile image.
              </p>
            </div>

            <NavLink
              to="/profile/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Dashboard
            </NavLink>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {typeof error === "string"
                ? error
                : error?.msg ||
                  "Failed to update profile."}
            </div>
          )}

          {/* FORM */}

          <ProfileForm
            profile={profile}
            onSave={handleSave}
            onCancel={handleCancel}
          />

        </div>
      </div>
    </main>
  );
}