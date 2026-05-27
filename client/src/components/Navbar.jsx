// Author: Krithik and Divya
// This file shows the navigation bar after the user logs in.

function Navbar({ user, setPage, onLogout }) {
  return (
    <nav className="navbar">
      <h2>GreenCards</h2>

      <div className="nav-actions">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("history")}>My History</button>

        {/* This button only appears for admin users. */}
        {user.role === "admin" && (
          <button onClick={() => setPage("admin")}>Admin History</button>
        )}

        <span>{user.name} ({user.role})</span>
        <button className="danger" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;