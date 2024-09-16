import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Handle success
      console.log("User created:", response.data);
      alert("User created successfully!");
    } catch (error) {
      // Handle error
      console.error("Error creating user:", error);
      alert("There was an error creating the user.");
    }
  };

  return (
    <div className="bg-blue text-white p-6 max-w-lg mx-auto my-16 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
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
            value={formData.fullName}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label
            className="block text-bluegray text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="text-gray-950 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-bluegray"
            type="password"
            id="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
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
