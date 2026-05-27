// Author: Krithik and Divya
// This file shows the logged-in user's own learning history.

import { useEffect, useState } from "react";
import { apiRequest, authHeaders } from "../api/api";

function MyHistory() {
  // This stores the user's learning history records.
  const [history, setHistory] = useState([]);

  // This stores API error messages.
  const [error, setError] = useState("");

  // This loads the logged-in user's history when the page opens.
  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await apiRequest("/history/me", {
          headers: authHeaders()
        });

        setHistory(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadHistory();
  }, []);

  return (
    <main className="page">
      <h1>My Learning History</h1>
      <p>Review your previous study attempts.</p>

      {error && <p className="error">{error}</p>}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>{item.flashcard?.question || "Deleted flashcard"}</td>
                <td>{item.flashcard?.category || "-"}</td>
                <td>{item.flashcard?.difficulty || "-"}</td>
                <td>{item.result}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && <p>No learning history yet.</p>}
      </div>
    </main>
  );
}

export default MyHistory;