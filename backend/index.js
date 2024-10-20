const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/UserSchema.js");
const Event = require("./models/EventSchema.js");
const Payment = require('./models/PaymentSchema.js')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createSTKToken, stkPush } = require("./controllers/token.js");

const maxAge = 1 * 60 * 60; // maxAge of 1 hour in seconds

// environment variables
const DB_URI = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 3000;
const myJwtSecret = process.env.SECRET_KEY;

const app = express();

// use middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tiketa.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser());

// Create JWT function
const createToken = (id) => {
  return jwt.sign({ id }, myJwtSecret, { expiresIn: maxAge });
};

// Handle errors that occur during user operations
const handleErrors = (err) => {
  // Initialize an object to store other specific error messages
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

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ Message: "Welcome Home" });
});

// GET Events route
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving events", error: err });
  }
});

// Create user route
app.post("/api/users", async (req, res) => {
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
      // httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "lax",
      secure: false,
    });
    res.cookie("user", user.fullName, {
      maxAge: maxAge * 1000,
      sameSite: "lax",
      secure: false,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
});

// LOGIN POST request
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("user", user.fullName, {
      maxAge: maxAge * 1000,
      sameSite: "lax",
      secure: false,
    });
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json(err);
  }
});

// STK PUSH handler
app.post("/stk-push", createSTKToken, stkPush, (req, res) => {
  const token = req.token;
  res.json({ token });
});


// Route to handle M-Pesa payment callback //////////////////////////////////////////////////////////////////////
app.post("/mpesa-callback", async (req, res) => {
  try {
    const callbackData = req.body.Body.stkCallback;

    // Check if the payment was successful
    if (callbackData.ResultCode === 0) {
      const paymentData = {
        phone: callbackData.CallbackMetadata.Item.find((item) => item.Name === "PhoneNumber").Value,
        amount: callbackData.CallbackMetadata.Item.find((item) => item.Name === "Amount").Value,
        transactionId: callbackData.CallbackMetadata.Item.find((item) => item.Name === "MpesaReceiptNumber").Value,
        transactionDate: callbackData.CallbackMetadata.Item.find((item) => item.Name === "TransactionDate").Value,
      };

      // Save payment data to the database (assuming you have a Payment model)
      await Payment.create(paymentData);

      // Send success response back to Safaricom
      res.status(200).json({ message: "Payment processed successfully" });
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing callback:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Connect to MongoDB using Mongoose
mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
  )
  .catch((err) => console.error("MongoDB connection error:", err));

  