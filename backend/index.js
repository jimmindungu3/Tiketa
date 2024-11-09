const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/UserSchema.js");
const Event = require("./models/EventSchema.js");
const Payment = require("./models/PaymentSchema.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createSTKToken, stkPush } = require("./controllers/token.js");

// Environment variables and constants
const DB_URI = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 3000;
const myJwtSecret = process.env.SECRET_KEY;
const maxAge = 1 * 60 * 60; // maxAge of 1 hour in seconds
const isProduction = process.env.NODE_ENV === 'production';

// Cookie configuration
const cookieConfig = {
  maxAge: maxAge * 1000, // Convert to milliseconds
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  path: '/',
  domain: isProduction ? '.vercel.app' : 'localhost'
};

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use((req, res, next) => {
  const allowedOrigins = ["https://tiketa.vercel.app", "http://localhost:5173"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, myJwtSecret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.userId = decodedToken.id;
    next();
  });
};

// JWT creation utility
const createToken = (id) => {
  return jwt.sign({ id }, myJwtSecret, { expiresIn: maxAge });
};

// Error handler utility
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect email") {
    errors.email = "Email not registered";
  }

  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }

  if (err.message === "Email doesn't exist") {
    errors.email = "Email not registered";
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Routes

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Tiketa API" });
});

// Get all events (public route)
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving events", error: err.message });
  }
});

// User registration
app.post("/api/users", async (req, res) => {
  const { fullName, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ email: "This email is already in use" });
    }

    const user = await User.create({ fullName, email, password });
    const token = createToken(user._id);

    // Set cookies
    res.cookie("jwt", token, {
      ...cookieConfig,
      httpOnly: true
    });
    
    res.cookie("user", user.fullName, {
      ...cookieConfig,
      httpOnly: false
    });

    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
});

// User login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    // Set cookies
    res.cookie("jwt", token, {
      ...cookieConfig,
      httpOnly: true
    });
    
    res.cookie("user", user.fullName, {
      ...cookieConfig,
      httpOnly: false
    });

    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
});

// User logout
app.post("/api/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("user", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
});

// Check auth status
app.get("/api/check-auth", authenticateToken, (req, res) => {
  res.status(200).json({ authenticated: true, userId: req.userId });
});

// M-Pesa payment routes
app.post("/stk-push", authenticateToken, createSTKToken, stkPush, (req, res) => {
  const token = req.token;
  res.json({ token });
});

app.post("/mpesa-callback", async (req, res) => {
  try {
    const callbackData = req.body.Body.stkCallback;

    if (callbackData.ResultCode === 0) {
      const paymentData = {
        phone: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "PhoneNumber"
        ).Value,
        amount: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "Amount"
        ).Value,
        transactionId: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "MpesaReceiptNumber"
        ).Value,
        transactionDate: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "TransactionDate"
        ).Value,
      };

      await Payment.create(paymentData);
      res.status(200).json({ message: "Payment processed successfully" });
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing callback:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Database connection and server startup
mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});