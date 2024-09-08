import React, { useState } from "react";
import SearchResults from "./SearchResults"; // Import the SearchResults component

const Library = () => {
  const [library, setLibrary] = useState([]); // Initialize library as an empty array
  const [message, setMessage] = useState(""); // State to hold success/error message

  // Function to handle adding a book to the library
  const handleAddToLibrary = (book) => {
    // Check if the book already exists in the library
    const isBookInLibrary = library.some((item) => item.id === book.id);
    if (!isBookInLibrary) {
      // If not in the library, add it to the library state
      setLibrary([...library, book]);
      setMessage(`${book.title} has been added to the library!`); // Display success message
    } else {
      // If already in the library, display a message
      setMessage(`${book.title} is already in the library.`);
    }

    // Clear the message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      {/* Display the message if it exists */}
      {message && <p>{message}</p>}
      
      {/* Render the SearchResults component and pass the library and onSelectBook props */}
      <SearchResults 
        searchResults={searchResults} 
        onSelectBook={handleAddToLibrary} 
        library={library} 
      />

      <h2>Your Library</h2>
      {/* Render the list of books in the library */}
      <ul>
        {library.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;