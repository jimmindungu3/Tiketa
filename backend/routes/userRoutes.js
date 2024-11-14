const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const myJwtSecret = process.env.SECRET_KEY;
const isProduction = process.env.NODE_ENV === "production";
const maxAge = 60 * 60; // MaxAge of 1 hour in seconds

// Create JWT function
const createToken = (id) => {
  return jwt.sign({ id }, myJwtSecret, { expiresIn: maxAge });
};

// Handle errors that occur during user operations
const handleErrors = (err) => {
  // Initialize an object to store specific error messages
  let errors = { email: "", password: "" };

  // handle login errors
  if (err.message === "Incorrect email") {
    errors.email = "Email not registered";
  }
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }
  if (err.message === "Email doesn't exist") {
    errors.email = "Email not registered";
  }

  // Handle signup errors
  // Check if the error is related to user validation
  if (err.message.includes("User validation failed")) {
    // Extract and process individual validation errors
    Object.values(err.errors).forEach(({ properties }) => {
      // Update the errors object with specific error messages
      // properties.path: The field that failed validation (e.g., 'email' or 'password')
      // properties.message: The corresponding error message for that field
      errors[properties.path] = properties.message;
    });
  }
  // Return the errors object containing field-specific error messages
  return errors;
};

// Create user route
router.post("/api/users", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Check for existing user with the same email
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return res.status(400).json({ email: "This email is already in use" });
    }
    const user = await User.create({ fullName, email, password });

    // Once user is created and saved, create cookie and send it back to client
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      httpOnly: true,
    });

    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
});

// LOGIN POST request
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      httpOnly: true,
    });
    res.status(200).json({ userName: user.fullName });
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json(err);
  }
});

// LOGOUT POST request
router.post("/api/logout", (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 10,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    httpOnly: true,
  });
  res.status(200).json({ message: "Logout Successful" });
});

module.exports = router;
