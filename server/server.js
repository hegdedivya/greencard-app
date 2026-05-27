// Author: Krithik and Divya
// This file starts the Express server and connects the app to MongoDB.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// This allows the React frontend to send requests to the backend.
app.use(cors());

// This allows the server to read JSON data from requests.
app.use(express.json());

// This route is used to quickly check if the backend is running.
app.get("/", (req, res) => {
  res.send("GreenCards API is running");
});

// These lines connect the main API route files.
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/flashcards", require("./routes/flashcardRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));

// This connects the backend to MongoDB, then starts the server.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });