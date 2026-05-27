// Author: Krithik
// This middleware checks if the user has a valid JWT token.

const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  try {
    // This gets the Authorization header from the request.
    const authHeader = req.headers.authorization;

    // This checks if the token exists and follows the Bearer token format.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // This extracts only the token part from the header.
    const token = authHeader.split(" ")[1];

    // This verifies the token using the secret key.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // This finds the logged-in user and removes the password from the result.
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // This saves the logged-in user details so other routes can use them.
    req.user = user;

    // This allows the request to continue to the next function.
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;