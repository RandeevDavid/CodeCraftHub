// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');
// Import the dotenv library to load environment variables from a .env file
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config(); // Initialize dotenv to read .env file

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Log the MongoDB URI being used for debugging purposes
    console.log('Mongo URI:', process.env.MONGO_URI); // For debugging
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    // Log a message indicating a successful connection
    console.log('MongoDB connected');
  } catch (error) {
    // Log any errors that occur during the connection attempt
    console.error('MongoDB connection error:', error);
    // Exit the process with a failure code (1) if the connection fails
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;

