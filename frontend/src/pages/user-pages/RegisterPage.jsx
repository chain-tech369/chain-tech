import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Back to Home */}
      <div className="flex justify-end px-4 py-4">
        <Link
          to="/"
          className="text-sm font-semibold text-blue-950 transition hover:text-yellow-500 fixed"
        >
          Back to Home
        </Link>
      </div>

      {/* Register */}
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">

        <div className="w-full max-w-lg">

          {/* Heading */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950">
              <span className="text-xl font-bold text-yellow-400">
                CT
              </span>
            </div>

            <h1 className="text-3xl font-bold text-blue-950">
              Create Your Account
            </h1>

            <p className="mt-2 text-slate-500">
              Join the Chain-Tech platform
            </p>

          </div>

          {/* Card */}
          <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

            <RegisterForm />

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?

              <Link
                to="/login"
                className="ml-1 font-semibold text-blue-600 hover:text-blue-800"
              >
                Login
              </Link>
            </p>

            {/* Developer */}
            <p className="mt-3 text-center text-sm text-slate-500">
              Want to work with us?

              <Link
                to="/join-us"
                className="ml-1 font-semibold text-yellow-600 hover:text-yellow-700"
              >
                Join as a Developer
              </Link>
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}