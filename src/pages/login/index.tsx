import React, { useState } from "react";
import {
  AuthFormWrapper,
  InputField,
  SubmitButton,
} from "../../components/register";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data: ", formData);

    // Chamada a api simulada!
    setIsLoading(true);
    setTimeout(() => {
      alert(
        `Mock login com:\nEmail: ${formData.email}\nSenha: ${formData.password}`,
      );
      setIsLoading(false);
    }, 1000);
  };

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
          label="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="mt-6">
          <SubmitButton isLoading={isLoading} text="Sign in" />
        </div>
      </form>
    </AuthFormWrapper>
  );
}

export default Login;
