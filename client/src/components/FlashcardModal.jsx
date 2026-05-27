// Author: Divya
// This file shows the add/edit flashcard modal form.

import { useState } from "react";
import { apiRequest, authHeaders } from "../api/api";

function FlashcardModal({ card, closeModal, reloadCards }) {
  // This stores form values for adding or editing a flashcard.
  const [form, setForm] = useState({
    question: card?.question || "",
    answer: card?.answer || "",
    category: card?.category || "General",
    difficulty: card?.difficulty || "Easy"
  });

  // This stores form error messages.
  const [error, setError] = useState("");

  // This updates the form when the user types.
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  // This saves a new flashcard or updates an existing one.
  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.question || !form.answer) {
      setError("Question and answer are required");
      return;
    }

    try {
      await apiRequest(card ? `/flashcards/${card._id}` : "/flashcards", {
        method: card ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(form)
      });

      reloadCards();
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="modal-overlay">
      <section className="modal">
        <h2>{card ? "Edit Flashcard" : "Add Flashcard"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="question"
            placeholder="Question"
            value={form.question}
            onChange={handleChange}
          />

          <textarea
            name="answer"
            placeholder="Answer"
            value={form.answer}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <select name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <div className="card-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default FlashcardModal;