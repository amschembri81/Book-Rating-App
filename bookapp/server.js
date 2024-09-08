const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectToMongoDB = require('./db'); // MongoDB connection
const { port } = require('./config'); // Import port from config.js

// Routes imports
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const searchRouter = require('./routes/search');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());  // JSON body parsing
app.use(cors());  // Enable Cross-Origin Resource Sharing

// Routes
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/search', searchRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the BookApp API');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB and start the server
connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB. Server not started.");
});