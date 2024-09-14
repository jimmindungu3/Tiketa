import React from "react";

const SignUpForm = () => {
  return (
    <div className="bg-blue text-white p-6 max-w-lg mx-auto my-16 rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-semibold text-white mb-6">Sign Up</h2> */}

      <form>
        {/* Full Name Field */}
        <div className="mb-4">
          <label
            className="block text-bluegray text-sm font-bold mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="text-gray-950 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-bluegray"
            type="text"
            id="fullName"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            className="block text-bluegray text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="text-gray-950 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-bluegray"
            type="email"
            id="email"
            placeholder="example@mail.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            className="block text-bluegray text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="text-gray-950 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-bluegray"
            type="password"
            id="password"
            placeholder="********"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label
            className="block text-bluegray text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="text-gray-950 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-bluegray"
            type="password"
            id="password"
            placeholder="********"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-100 hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
