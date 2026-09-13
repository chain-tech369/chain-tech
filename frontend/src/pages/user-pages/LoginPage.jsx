import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";

export default function LoginPage() {
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

      {/* Login */}
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950">
              <span className="text-xl font-bold text-yellow-400">
                CT
              </span>
            </div>

            <h1 className="text-3xl font-bold text-blue-950">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-500">
              Sign in to your Chain-Tech account
            </p>

          </div>

          {/* Card */}
          <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

            <LoginForm />

            {/* Register */}
            <div className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?

              <Link
                to="/register"
                className="ml-1 font-semibold text-blue-600 hover:text-blue-800"
              >
                Create Account
              </Link>
            </div>

            {/* Join */}
            <div className="mt-4 text-center text-sm text-slate-500">
              Are you a developer?

              <Link
                to="/join-us"
                className="ml-1 font-semibold text-yellow-600 hover:text-yellow-700"
              >
                Join Chain-Tech
              </Link>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}