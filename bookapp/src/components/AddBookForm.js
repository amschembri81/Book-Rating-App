import React, { useState } from "react";

function AddBookForm({ onAddBook, onAddBookFromSearch, setSearchResults }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const apiKey = "YOUR_GOOGLE_BOOKS_API_KEY"; // Replace with your actual API key

  // Function to handle adding a new book manually
  const handleAddBook = () => {
    const newBook = {
      id: Date.now(), // Use Date.now() to generate a unique ID for the new book
      name,
      author,
      category,
      addedFromAPI: false, // Flag to indicate that the book was added manually
    };
    onAddBook(newBook); // Call the onAddBook function passed as a prop to add the book
    setName(""); // Reset the name input field
    setAuthor(""); // Reset the author input field
    setCategory(""); // Reset the category input field
  };

  // Function to fetch book data from the Google Books API based on the book title
  const fetchBookData = async (bookTitle) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from Google Books API");
      }
      const result = await response.json();
      if (result.items && result.items.length > 0) {
        const newBooks = result.items.map((item) => ({
          id: Date.now(), // Generate a unique ID for each book from the API
          name: item.volumeInfo.title || "No Title", // Use "No Title" if title is not available
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No Author", // Join multiple authors with a comma
          category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "Uncategorized", // Use "Uncategorized" if no category is available
          thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null, // Check if a thumbnail image is available
          addedFromAPI: true, // Flag to indicate that the book was added from the API
        }));
        setSearchResults(newBooks); // Update the search results state with the fetched books
      } else {
        alert("No books found with that title."); // Alert the user if no books were found
      }
    } catch (error) {
      console.error("Error fetching book data:", error); // Log the error to the console
      alert("An error occurred while fetching book data. Please try again."); // Alert the user if an error occurred
    }
  };

  // Function to handle searching for books in the Google Books API
  const handleSearchDatabase = () => {
    if (!name) {
      alert("Please enter a book title to search."); // Alert the user if no title is entered
      return;
    }
    fetchBookData(name); // Fetch book data based on the entered title
  };

  return (
    <div style={styles.container}>
      <h2>Add a New Book</h2>
      <label>Book Title:</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter book title"
        style={styles.formInput}
      />
      <label>Author:</label>
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter author"
        style={styles.formInput}
      />
      <label>Category:</label>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category"
        style={styles.formInput}
      />
      <button onClick={handleAddBook} style={styles.button}>Add Book</button>
      <button onClick={handleSearchDatabase} style={styles.button}>Search Database</button>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#FBFBFB',
    marginVertical: '10px',
    borderWidth: '1px',
    borderColor: '#ddd',
  },
  formInput: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    fontSize: '18px',
    borderWidth: '1px',
    borderColor: '#ddd',
    width: '100%',
  },
  button: {
    borderRadius: '8px',
    paddingVertical: '10px',
    paddingHorizontal: '15px',
    backgroundColor: 'lightskyblue',
    borderWidth: '1px',
    borderColor: '#ddd',
    cursor: 'pointer',
    margin: '5px',
  },
};

export default AddBookForm;