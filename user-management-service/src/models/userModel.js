// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // Define the username field
  username: {
    type: String, // The data type of the username is String
    required: true, // The username field is required
    unique: true, // The username must be unique in the collection
  },
  // Define the password field
  password: {
    type: String, // The data type of the password is String
    required: true, // The password field is required
  },
});

// Create the User model using the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;

