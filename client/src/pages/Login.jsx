// Author: Krithik
// This file handles the login form and sends login details to the backend.

import { useState } from "react";
import { apiRequest } from "../api/api";

function Login({ onLogin, goRegister }) {
  // This stores the login form values.
  const [form, setForm] = useState({ email: "", password: "" });

  // This stores login error messages.
  const [error, setError] = useState("");

  // This updates the form state when the user types.
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // This submits the login form to the backend.
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      // This saves the logged-in user in the main App component.
      onLogin(data.user, data.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login</h1>
        <p>Welcome back to GreenCards.</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <button type="submit">Login</button>
        </form>

        <button className="link-btn" onClick={goRegister}>
          Create an account
        </button>
      </section>
    </main>
  );
}

export default Login;