// Import the express library
const express = require('express');
// Create a new router instance
const router = express.Router();
// Import the userController module which contains the controller functions
const userController = require('../controllers/userController');
// Import the authMiddleware for protecting routes
const auth = require('../middleware/authMiddleware');

// Define the route for user registration
// This route handles POST requests to /users/register and calls the registerUser function in the userController
router.post('/register', userController.registerUser);

// Define the route for user login
// This route handles POST requests to /users/login and calls the loginUser function in the userController
router.post('/login', userController.loginUser);

// Define the route for updating user profile
// This route handles PUT requests to /users/:username and calls the updateUserProfile function in the userController
// The route is protected by the auth middleware, which checks for a valid JWT
router.put('/:username', auth, userController.updateUserProfile);

// Export the router to be used in other parts of the application
module.exports = router;

