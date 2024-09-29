import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 200 && response.data.user) {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data); // Log the error to the console
    }
  };

  return (
    <div className="bg-blue text-white p-6 max-w-lg mx-auto my-16 rounded-lg shadow-lg">
      {/* <h2 className="text-2xl text-white font-semibold mb-6">Login</h2> */}

      <form onSubmit={(e) => handleLogin(e)}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-100 hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            Login
          </button>
        </div>
      </form>
      <hr className="text-white mt-6" />
      <div className="my-4">
        Don't have an account?{" "}
        <span className="font-semibold text-red-100">
          <Link to={"/sign-up"}>SignUp Here</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
