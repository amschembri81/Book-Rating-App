const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// POST /auth/login
// Authenticate user and provide a token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user from the database
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token, user: { username } });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /auth/register
// Register a new user
router.post('/register', async (req, res) => {
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

module.exports = router;