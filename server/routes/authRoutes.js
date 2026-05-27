// Author: Krithik
// This file handles registration, login, password hashing, and JWT creation.

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// This function creates a JWT token for a logged-in user.
function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

// This route registers a new user.
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // This checks that the main fields are not empty.
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // This checks if the email is already registered.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // This hashes the password before saving it to MongoDB.
    const hashedPassword = await bcrypt.hash(password, 10);

    // This creates the user in the database.
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    // This creates a token after successful registration.
    const token = createToken(user);

    // This sends back the token and safe user details.
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// This route logs in an existing user.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // This finds the user by email.
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // This compares the entered password with the hashed password.
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // This creates a token after successful login.
    const token = createToken(user);

    // This sends the token and user details to the frontend.
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// This route returns the currently logged-in user.
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;