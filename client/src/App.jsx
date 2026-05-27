// Author: Krithik and Divya
// This file controls the main single-page app flow.

import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyHistory from "./pages/MyHistory";
import AdminHistory from "./pages/AdminHistory";
import Navbar from "./components/Navbar";

function App() {
  // This stores the logged-in user.
  const [user, setUser] = useState(null);

  // This controls which page is shown without reloading the browser.
  const [page, setPage] = useState("login");

  // This checks localStorage when the app first loads.
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPage("dashboard");
    }
  }, []);

  // This runs after login or registration is successful.
  function handleLogin(userData, token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setPage("dashboard");
  }

  // This logs the user out and clears saved login details.
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  }

  // This shows login or register when no user is logged in.
  if (!user) {
    return (
      <div>
        {page === "login" && (
          <Login onLogin={handleLogin} goRegister={() => setPage("register")} />
        )}

        {page === "register" && (
          <Register onRegister={handleLogin} goLogin={() => setPage("login")} />
        )}
      </div>
    );
  }

  // This shows the main app after the user logs in.
  return (
    <div>
      <Navbar user={user} setPage={setPage} onLogout={handleLogout} />

      {page === "dashboard" && <Dashboard />}
      {page === "history" && <MyHistory />}
      {page === "admin" && user.role === "admin" && <AdminHistory />}
    </div>
  );
}

export default App;