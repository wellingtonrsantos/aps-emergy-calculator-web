import React, { useState } from "react";
import {
  AuthFormWrapper,
  InputField,
  SubmitButton,
} from "../../components/register";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");

    console.log("Register data:", formData);

    // Mock da API
    setTimeout(() => {
      setIsLoading(false);
      alert(
        `Mock register com:\nNome: ${formData.name}\nEmail: ${formData.email}\nSenha: ${formData.password}\nConfirmação: ${formData.password_confirmation}`,
      );
    }, 1000);
  };

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
          placeholder="John Doe"
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

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="mt-6">
          <SubmitButton isLoading={isLoading} text="Create account" />
        </div>
      </form>
    </AuthFormWrapper>
  );
}

export default Register;
