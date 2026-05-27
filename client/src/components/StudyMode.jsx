// Author: Krithik and Divya
// This file controls study mode and saves learning history.

import { useState } from "react";
import { apiRequest, authHeaders } from "../api/api";

function StudyMode({ flashcards, closeStudy }) {
  // This stores the flashcards left in the current study session.
  const [queue, setQueue] = useState([...flashcards]);

  // This controls whether the answer is shown.
  const [revealed, setRevealed] = useState(false);

  // This stores study mode error messages.
  const [error, setError] = useState("");

  // This saves the user's study result to the backend.
  async function saveHistory(cardId, result) {
    await apiRequest("/history", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        flashcardId: cardId,
        result
      })
    });
  }

  // This removes the card from the study queue when the user knows it.
  async function handleGotIt() {
    try {
      const current = queue[0];
      await saveHistory(current._id, "Got it");
      setQueue(queue.slice(1));
      setRevealed(false);
    } catch (error) {
      setError(error.message);
    }
  }

  // This moves the card to the end of the queue when the user wants to review it again.
  async function handleReviewAgain() {
    try {
      const current = queue[0];
      await saveHistory(current._id, "Review again");

      const updatedQueue = queue.slice(1);
      updatedQueue.push(current);

      setQueue(updatedQueue);
      setRevealed(false);
    } catch (error) {
      setError(error.message);
    }
  }

  // This shows a completion message when the queue is empty.
  if (queue.length === 0) {
    return (
      <div className="modal-overlay">
        <section className="modal">
          <h2>Study Complete</h2>
          <p>You have completed this study session.</p>
          <button onClick={closeStudy}>Close</button>
        </section>
      </div>
    );
  }

  const current = queue[0];

  return (
    <div className="modal-overlay">
      <section className="modal">
        <h2>Study Mode</h2>

        {error && <p className="error">{error}</p>}

        <p className="badge-row">
          <span>{current.category}</span>
          <span>{current.difficulty}</span>
        </p>

        <h3>{current.question}</h3>

        {revealed && <p className="answer">{current.answer}</p>}

        {!revealed ? (
          <button onClick={() => setRevealed(true)}>Reveal Answer</button>
        ) : (
          <div className="card-actions">
            <button onClick={handleGotIt}>Got it</button>
            <button onClick={handleReviewAgain}>Review again</button>
          </div>
        )}

        <button className="link-btn" onClick={closeStudy}>Exit Study Mode</button>
      </section>
    </div>
  );
}

export default StudyMode;