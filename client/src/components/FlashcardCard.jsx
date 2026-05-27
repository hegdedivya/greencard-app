// Author: Divya
// This file displays one flashcard card with reveal, edit, and delete buttons.

import { useState } from "react";

function FlashcardCard({ card, onEdit, onDelete }) {
  // This controls whether the answer is visible.
  const [revealed, setRevealed] = useState(false);

  return (
    <article className="flashcard">
      <div className="badge-row">
        <span>{card.category}</span>
        <span>{card.difficulty}</span>
      </div>

      <h3>{card.question}</h3>

      {revealed && <p className="answer">{card.answer}</p>}

      <div className="card-actions">
        <button onClick={() => setRevealed(!revealed)}>
          {revealed ? "Hide Answer" : "Reveal Answer"}
        </button>

        <button onClick={() => onEdit(card)}>Edit</button>

        <button className="danger" onClick={() => onDelete(card._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default FlashcardCard;