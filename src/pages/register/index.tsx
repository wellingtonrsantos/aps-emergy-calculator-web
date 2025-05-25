import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthFormWrapper,
  InputField,
  SubmitButton,
} from "../../components/register";
import { registerUser } from "@/services/authService";
import { useAxiosErrorHandler } from "@/hooks/useAxiosErrorHandler";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    mobile_number: "",
    password: "",
    password_confirmation: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const handleError = useAxiosErrorHandler();
  const navigate = useNavigate();
  const { isLoading: redirectLoading } = useRedirectIfAuthenticated();

  function formatMobileNumber(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "mobile_number" ? formatMobileNumber(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mobile_number || formData.mobile_number.length < 14) {
      setFormError("O número de celular é obrigatório e deve estar completo.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setFormError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setFormError("");

    try {
      await registerUser({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        mobile_number: formData.mobile_number,
      });

      navigate("/login", { state: { registered: true } });
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (redirectLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthFormWrapper
      title="Create a new account"
      altText="login to your account"
      altLink="/login"
    >
      <form onSubmit={handleSubmit}>
        <InputField
          id="name"
          name="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John"
        />
        <InputField
          id="surname"
          name="surname"
          label="Surname"
          type="text"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Doe"
        />
        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="user@example.com"
        />
        <InputField
          id="mobile_number"
          name="mobile_number"
          label="Mobile Number"
          type="tel"
          value={formData.mobile_number}
          onChange={handleChange}
          placeholder="(99) 99999-9999"
        />
        <InputField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          canTogglePassword
        />
        <InputField
          id="password_confirmation"
          name="password_confirmation"
          label="Confirm Password"
          type="password"
          value={formData.password_confirmation}
          onChange={handleChange}
          canTogglePassword
        />

        {formError && <p className="mt-2 text-sm text-red-500">{formError}</p>}

        <div className="mt-6">
          <SubmitButton isLoading={isLoading} text="Create account" />
        </div>
      </form>
    </AuthFormWrapper>
  );
}

export default Register;
