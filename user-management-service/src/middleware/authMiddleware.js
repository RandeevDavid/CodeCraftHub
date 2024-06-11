// Import the jsonwebtoken library for verifying JWT tokens
const jwt = require('jsonwebtoken');
// Import the User model to find the user in the database
const User = require('../models/userModel');

// Define the authentication middleware function
const auth = async (req, res, next) => {
  // Get the token from the Authorization header, if it exists
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user by the ID encoded in the token and exclude the password field from the result
    req.user = await User.findById(decoded.id).select('-password');
    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Export the auth middleware function for use in other parts of the application
module.exports = auth;