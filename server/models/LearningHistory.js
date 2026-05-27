// Author: Krithik and Divya
// This file stores learning history records for the user profile and admin view.

const mongoose = require("mongoose");

const learningHistorySchema = new mongoose.Schema(
  {
    // This links the history record to a user.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // This links the history record to a flashcard.
    flashcard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flashcard",
      required: true
    },

    // This stores the user's study result.
    result: {
      type: String,
      enum: ["Got it", "Review again"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LearningHistory", learningHistorySchema);