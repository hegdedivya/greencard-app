// Author: Krithik and Divya
// This middleware checks if the logged-in user is an admin.

function adminMiddleware(req, res, next) {
  // This blocks normal users from accessing admin-only routes.
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  // This allows the request to continue if the user is an admin.
  next();
}

module.exports = adminMiddleware;