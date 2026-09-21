import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function ProfilePage() {
  // ==========================================
  // GET USER FROM REDUX
  // ==========================================
  const { user } = useSelector((state) => state.auth);

  // ==========================================
  // PROFILE STATE
  // ==========================================
  const [profile, setProfile] = useState({
    phone: "",
    profile_image: "",
    bio: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD PROFILE
  // ==========================================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        /*
         * TEMPORARY PROFILE DATA
         *
         * Later replace with:
         *
         * GET /profiles/me
         *
         * using Axios.
         */

        setProfile({
          phone: "",
          profile_image: "",
          bio: "",
          address: "",
        });
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ==========================================
  // GET USER INITIAL
  // ==========================================
  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }

    return "U";
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-500">
            My Account
          </p>

          <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            View your Chain-Tech profile information and personal details.
          </p>
        </div>

        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            PROFILE CARD
        ========================================== */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* ==========================================
              PROFILE HEADER
          ========================================== */}
          <div className="bg-blue-950 px-6 py-8 sm:px-10">
            <div className="flex flex-col items-center gap-5 sm:flex-row">

              {/* PROFILE IMAGE */}
              {profile.profile_image ? (
                <img
                  src={profile.profile_image}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-yellow-400 object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-400 bg-white text-4xl font-bold text-blue-950 shadow-lg">
                  {getUserInitial()}
                </div>
              )}

              {/* USER INFORMATION */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {user?.email || "Chain-Tech User"}
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Chain-Tech Member
                </p>
              </div>
            </div>
          </div>

          {/* ==========================================
              PROFILE CONTENT
          ========================================== */}
          <div className="p-6 sm:p-10">

            {/* HEADER */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-950">
                  Profile Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your personal profile information.
                </p>
              </div>

              {/* GO TO EDIT PROFILE PAGE */}
              <NavLink
                to="/profile/edit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Edit Profile
              </NavLink>
            </div>

            {/* ==========================================
                PROFILE INFORMATION GRID
            ========================================== */}
            <div className="grid gap-6 sm:grid-cols-2">

              {/* PHONE */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </p>

                <p className="mt-2 break-words text-sm font-medium text-slate-900">
                  {profile.phone || "Not provided"}
                </p>
              </div>

              {/* ADDRESS */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Address
                </p>

                <p className="mt-2 break-words text-sm font-medium text-slate-900">
                  {profile.address || "Not provided"}
                </p>
              </div>

              {/* BIO */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Bio
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {profile.bio || "No bio added yet."}
                </p>
              </div>

              {/* PROFILE IMAGE */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Profile Image
                </p>

                <p className="mt-2 break-all text-sm text-slate-700">
                  {profile.profile_image ||
                    "No profile image provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            PROFILE SCHEMA INFORMATION
        ========================================== */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h3 className="font-semibold text-blue-950">
            Profile fields
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Your profile contains your phone number, profile image,
            biography, and address. Your email is provided by your
            user account.
          </p>
        </div>
      </div>
    </main>
  );
}