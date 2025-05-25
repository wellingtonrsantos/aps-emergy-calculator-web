import React, { useState } from "react";
import {
  AuthFormWrapper,
  InputField,
  SubmitButton,
} from "../../components/register";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";
import { useAxiosErrorHandler } from "@/hooks/useAxiosErrorHandler";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleError = useAxiosErrorHandler();

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { isLoading: redirectLoading } = useRedirectIfAuthenticated();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/", { replace: true });
    } catch (error) {
      handleError(error);
    }
  };

  if (redirectLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <AuthFormWrapper
      title="Sign in to your account"
      altText="create a new account"
      altLink="/register"
    >
      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="user@example.com"
        />
        <InputField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          canTogglePassword
        />
        <div className="mt-6">
          <SubmitButton isLoading={isLoading} text="Sign in" />
        </div>
      </form>
    </AuthFormWrapper>
  );
}

export default Login;
