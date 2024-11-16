const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const stkPush = require("./routes/stkPush");

// Environment variables
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.CONNECTION_STRING;

// Initialize app
const app = express();

// Increase the payload size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS config
app.use(
  cors({
    origin: ["https://tiketa.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use middlewares
app.use(express.json());
app.use(cookieParser());

// Consume the routers
app.use(eventRoutes);
app.use(userRoutes);
app.use(stkPush);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ Message: "Welcome Home" });
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
  )
  .catch((err) => console.error("MongoDB connection error:", err));
