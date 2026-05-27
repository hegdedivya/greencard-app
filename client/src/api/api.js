// Author: Krithik and Divya
// This file stores reusable API helper functions for frontend requests.

const API_URL = "http://localhost:3000/api";

// This gets the saved JWT token from localStorage.
export function getToken() {
  return localStorage.getItem("token");
}

// This creates headers for protected API requests.
export function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  };
}

// This is a reusable function for calling backend API routes.
export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json();

  // This throws an error if the backend sends a failed response.
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}