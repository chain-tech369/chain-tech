import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/uis/Form";
import Input from "../../components/uis/Input";

import { fetchProfile } from "../../actions/profileActions";

export default function AccountDashboardPage() {
  const user = useLoaderData();
  const dispatch = useDispatch();

  const profileState = useSelector((state) => state.profile);

  const profile = profileState?.profile;
  const profileLoading = profileState?.loading || false;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProfile(user.id));
    }
  }, [user?.id, dispatch]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950">
            Account Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            View your account and profile information.
          </p>
        </div>

        <Form>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {/* =====================================
                USER INFORMATION
            ====================================== */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-950">
                  User Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your account information.
                </p>
              </div>

              {/* User Avatar + Name */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700">
                  {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {user?.first_name || ""}{" "}
                    {user?.last_name || ""}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              {/* User Information Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <Input
                  label="First Name"
                  name="first_name"
                  type="text"
                  value={user?.first_name || ""}
                  readOnly
                />

                <Input
                  label="Last Name"
                  name="last_name"
                  type="text"
                  value={user?.last_name || ""}
                  readOnly
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                />

                <Input
                  label="User ID"
                  name="id"
                  type="text"
                  value={user?.id || ""}
                  readOnly
                />

                <Input
                  label="Role"
                  name="role"
                  type="text"
                  value={user?.role?.name || user?.role || ""}
                  readOnly
                />

              </div>
            </section>

            {/* =====================================
                HORIZONTAL SEPARATOR
            ====================================== */}
            <div className="my-10 border-t border-slate-200" />

            {/* =====================================
                PROFILE INFORMATION
            ====================================== */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-950">
                  Profile Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your personal profile information.
                </p>
              </div>

              {profileLoading ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <p className="text-sm text-slate-500">
                    Loading profile information...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                  {/* Phone */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Phone Number
                    </p>

                    <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      {profile?.phone || "Not provided"}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Address
                    </p>

                    <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      {profile?.address || "Not provided"}
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="md:col-span-2">
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Profile Image
                    </p>

                    <div className="break-all rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      {profile?.profile_image || "Not provided"}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Bio
                    </p>

                    <div className="min-h-[120px] whitespace-pre-wrap rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900">
                      {profile?.bio || "No bio provided."}
                    </div>
                  </div>

                </div>
              )}
            </section>

          </div>
        </Form>

      </div>
    </main>
  );
}