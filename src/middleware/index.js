// middleware/authMiddleware.js

// Middleware function to ensure that only authenticated users can access the page
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware
    }
    res.redirect('/login'); // User is not authenticated, redirect to login page
  };
  
  // Middleware function to ensure that only admin users can access the page
  const ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.userType === "admin") {
      return next(); // User is authenticated as admin, proceed to the next middleware
    }
    res.redirect('/login'); // User is not authenticated as admin, redirect to login page
  };
  
  module.exports = { ensureAuthenticated, ensureAdmin };
  
  const authMiddleware = (req, res, next) => {
    // If user is authenticated, continue to the next middleware or route handler
    if (req.isAuthenticated()) {
      return next();
    }
  
    // If user is not authenticated, redirect to login page or send an error response
    res.status(401).json({ success: false, message: "Unauthorized" });
  };
  
  module.exports = authMiddleware;