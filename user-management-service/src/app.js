// Load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config(); // Initialize dotenv to read .env file

// Import required modules
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Create an Express application
const app = express();

// Connect to MongoDB using the connection settings from the .env file
connectDB(); // Function call to connect to the MongoDB database

// Use JSON middleware to parse JSON bodies into JavaScript objects
app.use(express.json()); // Middleware to handle JSON requests

// Define routes for user-related endpoints
app.use('/users', userRoutes); // Middleware to handle routes starting with /users

// Start the server on the specified port (default is 3000)
const port = process.env.PORT || 3000; // Define the port to run the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  // Log a message when the server starts successfully
});


