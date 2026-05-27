// Author: Krithik
// This file defines the User model for registration, login, and role-based access.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // This stores the user's name.
    name: {
      type: String,
      required: true,
      trim: true
    },

    // This stores the user's email and makes sure it is unique.
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // This stores the hashed password, not the plain password.
    password: {
      type: String,
      required: true
    },

    // This controls whether the account is a normal user or admin.
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);