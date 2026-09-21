import { useLoaderData, useNavigate } from "react-router-dom";

import Form from "../../components/uis/Form";
import Input from "../../components/uis/Input";
import Button from "../../components/uis/Button";

export default function UserDetailPage() {
  const user = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-5xl">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          User Details
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View your account information and user details.
        </p>
      </div>


      {/* ================================
          USER DETAILS CARD
      ================================= */}

      <Form>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Card Header */}

          <div className="mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-4">

              {/* Avatar */}

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700">
                {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* User Name */}

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {user?.first_name || ""}{" "}
                  {user?.last_name || ""}
                </h2>

                <p className="text-sm text-slate-500">
                  {user?.email || ""}
                </p>
              </div>

            </div>
          </div>


          {/* ================================
              DETAILS GRID
          ================================= */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* First Name */}

            <Input
              label="First Name"
              name="first_name"
              type="text"
              value={user?.first_name || ""}
              readOnly
            />


            {/* Last Name */}

            <Input
              label="Last Name"
              name="last_name"
              type="text"
              value={user?.last_name || ""}
              readOnly
            />


            {/* Email */}

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={user?.email || ""}
              readOnly
            />


            {/* User ID */}

            <Input
              label="User ID"
              name="id"
              type="text"
              value={user?.id || ""}
              readOnly
            />


            {/* Role */}

            <Input
              label="Role"
              name="role"
              type="text"
              value={user?.role?.name || user?.role || ""}
              readOnly
            />

          </div>


          {/* ================================
              ACTIONS
          ================================= */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 sm:w-auto"
            >
              Back
            </Button>

          </div>

        </div>
      </Form>

    </div>
  );
}