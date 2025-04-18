import React from "react";

type InputFieldProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
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
}: InputFieldProps) {
  return (
    <div className="mt-6">
      <label
        htmlFor={id}
        className="block text-sm leading-5 font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="focus:shadow-outline-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
        />
      </div>
    </div>
  );
}

export default InputField;
