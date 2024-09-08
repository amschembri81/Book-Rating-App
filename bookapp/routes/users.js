const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming User model
const router = express.Router();

// GET /users
// Retrieve a list of all users (excluding passwords)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from results
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

// POST /users
// Register a new user
router.post('/', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { username, email } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// GET /users/:id
// Retrieve details of a specific user by their ID (excluding password)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

// PUT /users/:id
// Update details of an existing user by their ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json({ message: `User with ID: ${req.params.id} updated successfully`, updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// DELETE /users/:id
// Delete a specific user by their ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: `User with ID: ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;