import { useState } from "react";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Registration data:", formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-5">

      {/* Full Name */}
      <Input
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
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

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        required
      />

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
        className="w-full rounded-xl bg-blue-950 py-3 hover:bg-blue-900"
      >
        Create Account
      </Button>

    </Form>
  );
}