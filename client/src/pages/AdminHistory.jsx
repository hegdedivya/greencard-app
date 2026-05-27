// Author: Krithik and Divya
// This file allows an admin to view all users' learning history.

import { useEffect, useState } from "react";
import { apiRequest, authHeaders } from "../api/api";

function AdminHistory() {
  // This stores all learning history records for the admin view.
  const [history, setHistory] = useState([]);

  // This stores admin page error messages.
  const [error, setError] = useState("");

  // This loads all users' learning history when the admin page opens.
  useEffect(() => {
    async function loadAllHistory() {
      try {
        const data = await apiRequest("/history/all", {
          headers: authHeaders()
        });

        setHistory(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadAllHistory();
  }, []);

  return (
    <main className="page">
      <h1>Admin: All Users' Learning History</h1>
      <p>View study activity across all users.</p>

      {error && <p className="error">{error}</p>}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
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
                <td>{item.user?.name || "-"}</td>
                <td>{item.user?.email || "-"}</td>
                <td>{item.flashcard?.question || "Deleted flashcard"}</td>
                <td>{item.flashcard?.category || "-"}</td>
                <td>{item.flashcard?.difficulty || "-"}</td>
                <td>{item.result}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && <p>No learning history found.</p>}
      </div>
    </main>
  );
}

export default AdminHistory;