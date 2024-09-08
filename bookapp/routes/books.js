const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Assuming Book model

// GET /books
// Retrieve all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books' });
  }
});

// POST /books
// Add a new book
router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  
  try {
    await newBook.save();
    res.status(201).json({ message: 'Book added', newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book' });
  }
});

// GET /books/:id
// Retrieve a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book' });
  }
});

// PUT /books/:id
// Update book information by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Book updated', updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
});

// DELETE /books/:id
// Delete a specific book by ID
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

module.exports = router;