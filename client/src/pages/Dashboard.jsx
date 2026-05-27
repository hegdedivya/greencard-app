// Author: Divya
// This file shows the flashcard dashboard, CRUD features, live search, and study mode.

import { useEffect, useState } from "react";
import { apiRequest, authHeaders } from "../api/api";
import FlashcardCard from "../components/FlashcardCard";
import FlashcardModal from "../components/FlashcardModal";
import StudyMode from "../components/StudyMode";

function Dashboard() {
  // This stores all flashcards loaded from the backend.
  const [flashcards, setFlashcards] = useState([]);

  // This controls whether the add/edit modal is open.
  const [modalOpen, setModalOpen] = useState(false);

  // This stores the flashcard currently being edited.
  const [editingCard, setEditingCard] = useState(null);

  // This controls whether study mode is open.
  const [studyOpen, setStudyOpen] = useState(false);

  // This stores the live search text.
  const [searchTerm, setSearchTerm] = useState("");

  // This stores the selected difficulty filter.
  const [difficulty, setDifficulty] = useState("All");

  // This stores API error messages.
  const [error, setError] = useState("");

  // This loads flashcards for the logged-in user.
  async function loadFlashcards() {
    try {
      const data = await apiRequest("/flashcards", {
        headers: authHeaders()
      });

      setFlashcards(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  // This runs once when the dashboard opens.
  useEffect(() => {
    loadFlashcards();
  }, []);

  // This opens the modal for adding a new flashcard.
  function openAddModal() {
    setEditingCard(null);
    setModalOpen(true);
  }

  // This opens the modal for editing an existing flashcard.
  function openEditModal(card) {
    setEditingCard(card);
    setModalOpen(true);
  }

  // This deletes a flashcard after confirming with the user.
  async function deleteFlashcard(id) {
    if (!confirm("Delete this flashcard?")) return;

    try {
      await apiRequest(`/flashcards/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });

      loadFlashcards();
    } catch (error) {
      alert(error.message);
    }
  }

  // This is the live search and difficulty filter logic.
  const filteredCards = flashcards.filter((card) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      card.question.toLowerCase().includes(search) ||
      card.answer.toLowerCase().includes(search) ||
      card.category.toLowerCase().includes(search);

    const matchesDifficulty =
      difficulty === "All" || card.difficulty === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <main className="page">
      <header className="hero">
        <div>
          <h1>My Flashcards</h1>
          <p>Create, study, search, and manage your learning cards.</p>
        </div>

        <div className="hero-actions">
          <button onClick={openAddModal}>+ Add Flashcard</button>
          <button onClick={() => setStudyOpen(true)}>Study Mode</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      <section className="toolbar">
        <input
          placeholder="Live search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </section>

      <p className="summary-text">
        Showing {filteredCards.length} of {flashcards.length} flashcards
      </p>

      <section className="grid">
        {filteredCards.length === 0 ? (
          <article className="flashcard">
            <h3>No flashcards found</h3>
            <p className="answer">Add a new flashcard or adjust the search/filter.</p>
          </article>
        ) : (
          filteredCards.map((card) => (
            <FlashcardCard
              key={card._id}
              card={card}
              onEdit={openEditModal}
              onDelete={deleteFlashcard}
            />
          ))
        )}
      </section>

      {modalOpen && (
        <FlashcardModal
          card={editingCard}
          closeModal={() => setModalOpen(false)}
          reloadCards={loadFlashcards}
        />
      )}

      {studyOpen && (
        <StudyMode
          flashcards={flashcards}
          closeStudy={() => setStudyOpen(false)}
        />
      )}
    </main>
  );
}

export default Dashboard;