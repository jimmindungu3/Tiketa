import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    // Clear errors as the user types
    if (e.target.id === "fullName") setFullNameError("");
    if (e.target.id === "email") setEmailError("");
    if (e.target.id === "password") setPasswordError("");
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
      // alert("User created successfully!");

      // Clear form data
      // setFormData({
      //   fullName: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        if (errorData.fullName) {
          setFullNameError(errorData.fullName);
        }
        if (errorData.email) {
          setEmailError(errorData.email);
        }
        if (errorData.password) {
          setPasswordError(errorData.password);
        }
      } else {
        console.error("Error creating user:", error);
        alert("There was an error creating the user.");
      }
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
          {fullNameError && <div className="text-red-100">{fullNameError}</div>}
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
            type="text"
            id="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && <div className="text-red-100">{emailError}</div>}
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
          {passwordError && <div className="text-red-100">{passwordError}</div>}
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
      <div className="my-4">
        Already Signed Up?{" "}
        <span className="font-semibold text-red-100">
          <Link to={"/login"}>Login Here</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
