// Author: Divya
// This file handles CRUD operations for flashcards.

const express = require("express");
const Flashcard = require("../models/Flashcard");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// This route gets all flashcards created by the logged-in user.
router.get("/", authMiddleware, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ user: req.user._id }).sort({
      createdAt: -1
    });

    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch flashcards" });
  }
});

// This route creates a new flashcard for the logged-in user.
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { question, answer, category, difficulty } = req.body;

    // This makes sure question and answer are not empty.
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    const flashcard = await Flashcard.create({
      question,
      answer,
      category,
      difficulty,
      user: req.user._id
    });

    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: "Failed to create flashcard" });
  }
});

// This route updates a flashcard owned by the logged-in user.
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { question, answer, category, difficulty } = req.body;

    const flashcard = await Flashcard.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      {
        question,
        answer,
        category,
        difficulty
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: "Failed to update flashcard" });
  }
});

// This route deletes a flashcard owned by the logged-in user.
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const flashcard = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete flashcard" });
  }
});

module.exports = router;