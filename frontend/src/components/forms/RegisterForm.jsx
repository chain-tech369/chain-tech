import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

import { registerAction } from "../../actions/authActions";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    terms: false,
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

    // Check terms
    if (!formData.terms) {
      alert("You must agree to the Terms of Service.");
      return;
    }

    try {
      // Data sent to the backend
      const userData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      };

      await dispatch(registerAction(userData));

      // Registration successful
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-5">

      {/* First Name */}
      <Input
        label="First Name"
        name="first_name"
        type="text"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="John"
        required
      />

      {/* Last Name */}
      <Input
        label="Last Name"
        name="last_name"
        type="text"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Doe"
        required
      />

      {/* Email */}
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        required
      />

      {/* Password */}
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a strong password"
        required
      />

      {/* Backend Error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Terms */}
      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4"
        />

        <span>
          I agree to the{" "}
          <a
            href="#"
            className="font-medium text-blue-600"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="font-medium text-blue-600"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-950 py-3 hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

    </Form>
  );
}