// Author: Krithik and Divya
// This file connects the React app to the root element in index.html.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

// This renders the main App component into the browser.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);