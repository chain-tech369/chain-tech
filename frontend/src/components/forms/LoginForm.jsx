import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

import { loginAction } from "../../actions/authActions";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const credentials = {
        email: formData.email,
        password: formData.password,
      };

      await dispatch(loginAction(credentials));

      // Login successful
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-5">

      {/* Email */}
      <Input
        id="email"
        name="email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </a>
        </div>

        <Input
          id="password"
          name="password"
          label=""
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Backend Error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Remember me */}
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
          className="h-4 w-4 rounded"
        />

        Remember me
      </label>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

    </Form>
  );
}