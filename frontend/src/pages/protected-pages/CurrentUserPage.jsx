import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentUserRedux } from "../../actions/userReduxActions";

export default function CurrentUserPage() {
  const dispatch = useDispatch();

  const {
    currentUser,
    loading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUserRedux());
    }
  }, [dispatch, currentUser]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-blue-600">
          Loading current user...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-red-50 p-6 text-red-600">
        <h2 className="text-lg font-semibold">
          Failed to load current user
        </h2>

        <p className="mt-2">{error}</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          No current user found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Current User
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Information about the currently logged-in user
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm font-medium text-gray-500">
              First Name
            </p>
            <p className="mt-1 text-base text-gray-900">
              {currentUser.first_name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Last Name
            </p>
            <p className="mt-1 text-base text-gray-900">
              {currentUser.last_name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Email
            </p>
            <p className="mt-1 text-base text-gray-900">
              {currentUser.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              User ID
            </p>
            <p className="mt-1 text-base text-gray-900">
              {currentUser.id || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Role
            </p>
            <p className="mt-1 text-base text-gray-900">
              {currentUser.role?.name ||
                currentUser.role_name ||
                "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Status
            </p>
            <p className="mt-1 text-base text-gray-900">
              {currentUser.is_active
                ? "Active"
                : "Inactive"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}