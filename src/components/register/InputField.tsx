import React, { useState } from "react";
import TogglePasswordButton from "./TogglePasswordButton";

type InputFieldProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  canTogglePassword?: boolean;
};

function InputField({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  required = true,
  placeholder,
  canTogglePassword,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = canTogglePassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="mt-6">
      <label
        htmlFor={id}
        className="block text-sm leading-5 font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="focus:shadow-outline-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
        />
        {canTogglePassword && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <TogglePasswordButton onVisibilityChange={setShowPassword} />
          </div>
        )}
      </div>
    </div>
  );
}

export default InputField;
