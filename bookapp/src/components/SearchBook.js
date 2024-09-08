import React, { useState } from 'react';
import axios from 'axios';
import { googleBooksApiKey } from '../config';

function SearchBook({ setSearchResults, onAddManualBook }) {
  // State to manage the search query from the input field
  const [query, setQuery] = useState('');
  
  // State to handle manual book entry (title, author, genre)
  const [manualBook, setManualBook] = useState({
    title: '',
    author: '',
    genre: '',
  });

  // State to display a message when a book is successfully added
  const [bookAddedMessage, setBookAddedMessage] = useState('');

  // Function to fetch book data from the Google Books API based on the query
  const fetchBookData = async (bookTitle) => {
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&key=${googleBooksApiKey}`;
      const response = await axios.get(url);
      console.log("Google Books API Response:", response.data); // Log the response for debugging
  
      if (response.data.items && response.data.items.length > 0) {
        // Map the response data to extract relevant book information (id, title, author, genre, thumbnail)
        const newBooks = response.data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || 'No Title',
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No Author',
          genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Uncategorized',
          thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
        }));
        console.log("New Books Array:", newBooks); // Log the array of new books
        setSearchResults(newBooks); // Update the search results in the parent component
      } else {
        alert('No books found with that title.');
      }
    } catch (error) {
      console.error('Error fetching book data:', error);
      alert('An error occurred while fetching book data.'); // Display an error alert
    }
  };

  // Handle input change in the search field
  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update the query state with the new value
    if (!e.target.value) {
      setSearchResults([]); // Clear the search results if the input is empty
      setBookAddedMessage(''); // Reset the book added message
      return;
    }
    fetchBookData(e.target.value);  // Fetch books matching the input value
  };

  // Handle input change for manual book entry (title, author, genre)
  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualBook((prevBook) => ({
      ...prevBook,
      [name]: value, // Dynamically update the respective field in the manualBook object
    }));
  };

  // Handle form submission for manually adding a book to the library
  const handleManualBookSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    const newBook = { ...manualBook, id: Date.now(), status: "Want to Read" }; // Create a new book object with a unique id and default status
    onAddManualBook(newBook); // Call the parent function to add the book to the library
    setManualBook({ title: '', author: '', genre: '' }); // Clear the manual book form inputs
    setBookAddedMessage('Book added to library!'); // Display a success message
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Add a Book to Your Library</h1>
      <div style={styles.container}>
        <h3>Search For a Book</h3>
        {/* Search input field for querying Google Books API */}
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          style={styles.formInput}
        />

        <h3>Or Add a Book Manually</h3>
        {/* Form for manually adding a book */}
        <form onSubmit={handleManualBookSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={manualBook.title}
            onChange={handleManualInputChange}
            style={styles.formInput}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={manualBook.author}
            onChange={handleManualInputChange}
            style={styles.formInput}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={manualBook.genre}
            onChange={handleManualInputChange}
            style={styles.formInput}
          />
          {/* Button to submit manual book entry */}
          <button type="submit" style={styles.addButton}>
            Add Book
          </button>
        </form>
        {/* Display message when a book is successfully added */}
        {bookAddedMessage && <p style={styles.bookAddedMessage}>{bookAddedMessage}</p>}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '20px',
    textAlign: 'center',
  },
  pageTitle: {
    marginBottom: '20px',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  container: {
    padding: '20px',
    backgroundColor: 'lightblue',
    borderWidth: '1px',
    borderColor: '#ddd',
    borderRadius: '8px',
    margin: '0 auto',
  },
  formInput: {
    padding: '10px',
    margin: '10px',
    borderRadius: '8px',
    fontSize: '18px',
  },
  addButton: {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#005254',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  bookAddedMessage: {
    marginTop: '20px',
    color: 'green',
  },
};

export default SearchBook;