// Author: Krithik
// This file handles user registration using the backend auth API.

import { useState } from "react";
import { apiRequest } from "../api/api";

function Register({ onRegister, goLogin }) {
  // This stores the registration form values.
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  // This stores registration error messages.
  const [error, setError] = useState("");

  // This updates form values while the user types.
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // This sends registration data to the backend.
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      // This logs in the user immediately after registration.
      onRegister(data.user, data.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Register</h1>
        <p>Create your GreenCards account.</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <button className="link-btn" onClick={goLogin}>
          Already have an account?
        </button>
      </section>
    </main>
  );
}

export default Register;