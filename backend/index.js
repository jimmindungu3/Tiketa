const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/UserSchema.js");
const cors = require("cors");
require("dotenv").config();

// environment variables
const DB_URI = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 3000;

const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

// Handle errors that occur during user operations
const handleErrors = (err) => {
  // Initialize an object to store other specific error messages
  let errors = { email: "", password: "" };

  // handle login errors
  // if (err.message === "Incorrect email") {
  //   errors.email = "Email not registered";
  // }

  // if (err.message === "Incorrect password") {
  //   errors.password = "Incorrect password";
  // }

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






// Root route
app.get("/", (req, res) => {
  res.status(200).json({ Message: "Welcome Home" });
});

// POST route to create a new user
app.post("/api/users", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json(errors);
  }
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
  )
  .catch((err) => console.error("MongoDB connection error:", err));
