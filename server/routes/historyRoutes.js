// Author: Krithik and Divya
// This file handles learning history for users and admin profile view.

const express = require("express");
const LearningHistory = require("../models/LearningHistory");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// This route saves a learning history record when a user studies a card.
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { flashcardId, result } = req.body;

    // This checks that the required study data exists.
    if (!flashcardId || !result) {
      return res.status(400).json({ message: "Flashcard and result are required" });
    }

    const history = await LearningHistory.create({
      user: req.user._id,
      flashcard: flashcardId,
      result
    });

    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to save learning history" });
  }
});

// This route gets the logged-in user's own learning history.
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const history = await LearningHistory.find({ user: req.user._id })
      .populate("flashcard", "question category difficulty")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your history" });
  }
});

// This route lets an admin view all users' learning history.
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const history = await LearningHistory.find()
      .populate("user", "name email role")
      .populate("flashcard", "question category difficulty")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all history" });
  }
});

module.exports = router;