// Import the User model, bcrypt for password hashing, and jwt for token generation
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
// This function handles the registration of a new user
exports.registerUser = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return a success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Return an error response if something goes wrong
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// User login
// This function handles the login of an existing user
exports.loginUser = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token in the response
    return res.status(200).json({ token });
  } catch (error) {
    // Return an error response if something goes wrong
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// User profile management
// This function handles updating the user's profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Extract the current username from the URL parameters and the new username from the request body
    const { username } = req.params;
    const { newUsername } = req.body;

    // Validate input
    if (!newUsername) {
      return res.status(400).json({ message: 'New username is required' });
    }

    // Find the user by current username and update to the new username
    const user = await User.findOneAndUpdate({ username }, { username: newUsername }, { new: true });

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return a success response with the updated user information
    return res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    // Return an error response if something goes wrong
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

