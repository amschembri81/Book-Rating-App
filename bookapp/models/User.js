// Import mongoose to define a schema and model for MongoDB
const mongoose = require('mongoose');

// Import bcrypt for password hashing
const bcrypt = require('bcrypt');

// Define the schema for a 'User' document in the MongoDB database
const userSchema = new mongoose.Schema({
  
  // 'username' stores the unique username of the user (String data type)
  username: {
    type: String,      // The type is String
    required: true,    // Username is required (must be provided)
    unique: true       // Each username must be unique (no duplicates)
  },

  // 'password' stores the user's password (String data type)
  password: {
    type: String,      // The type is String
    required: true     // Password is required (must be provided)
  }
});

// Pre-save hook to hash the user's password before saving it to the database
// This middleware runs before the 'save' operation on a user document
userSchema.pre('save', async function (next) {

  // Check if the password has been modified; if not, skip hashing
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt (random data) to hash the password
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password using bcrypt and the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    
    // Move to the next middleware or save the user after hashing the password
    next();
  } catch (error) {
    // If an error occurs during hashing, pass the error to the next middleware
    next(error);
  }
});

// Create the 'User' model using the schema defined above
// The model represents the 'users' collection in the MongoDB database
const User = mongoose.model('User', userSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;