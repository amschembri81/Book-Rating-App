const express = require('express');
const axios = require('axios');
const router = express.Router();
const { googleBooksApiKey } = require('../config');

// GET /search/books
// Search for books using the Google Books API
router.get('/books', async (req, res) => {
  const { title, startIndex = 0, maxResults = 10 } = req.query;

  if (!title) {
    return res.status(400).json({ message: 'Please provide a book title to search for.' });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${googleBooksApiKey}`
    );

    if (response.data.items && response.data.items.length > 0) {
      const books = response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title || 'No Title',
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No Author',
        genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Uncategorized',
        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      }));

      res.json({ message: 'Books found', books });
    } else {
      res.status(404).json({ message: 'No books found with that title.' });
    }
  } catch (error) {
    console.error('Error fetching book data:', error);
    res.status(500).json({ message: 'An error occurred while searching for books.' });
  }
});

module.exports = router;