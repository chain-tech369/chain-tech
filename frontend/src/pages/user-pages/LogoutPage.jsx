import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutSuccess } from "../../app/authSlice";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutSuccess());

    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Logging out...
        </h1>

        <p className="mt-2 text-gray-500">
          Please wait.
        </p>
      </div>
    </div>
  );
}