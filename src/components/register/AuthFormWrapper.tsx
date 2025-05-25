import { Link } from "react-router-dom";
import React from "react";

type AuthFormWrapperProps = {
  title: string;
  altText: string;
  altLink: string;
  children: React.ReactNode;
};

function AuthFormWrapper({
  title,
  altText,
  altLink,
  children,
}: AuthFormWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Auth"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500">
          Or{" "}
          <Link
            to={altLink}
            className="font-medium text-green-700 transition duration-150 ease-in-out hover:text-green-600 focus:underline focus:outline-none"
          >
            {altText}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthFormWrapper;
