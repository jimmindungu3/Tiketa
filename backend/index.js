const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/UserSchema.js");
const cors = require('cors')
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(cors())

const DB_URI = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
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
    // Send response back
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving user");
  }
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
  )
  .catch((err) => console.error("MongoDB connection error:", err));
