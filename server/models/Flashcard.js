// Author: Divya
// This file defines the Flashcard model used for creating and managing flashcards.

const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
  {
    // This stores the question shown on the flashcard.
    question: {
      type: String,
      required: true,
      trim: true
    },

    // This stores the answer that is revealed during study.
    answer: {
      type: String,
      required: true,
      trim: true
    },

    // This stores the flashcard topic or category.
    category: {
      type: String,
      default: "General",
      trim: true
    },

    // This stores how difficult the flashcard is.
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy"
    },

    // This links each flashcard to the logged-in user who created it.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flashcard", flashcardSchema);