import { useState } from "react";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

export default function LoginForm() {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Login data:", formData);
  };

  return (
    <Form onSubmit={handleSubmit}>

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
      <Button type="submit">
        Login
      </Button>

    </Form>
  );
}