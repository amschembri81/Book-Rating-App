import React from "react";

const SearchResults = ({ searchResults, onSelectBook, library = [] }) => (
  <div style={styles.resultsContainer}>
    {searchResults.length > 0 ? (
      searchResults.map((book) => {
        // Safely check if the book is already in the library
        const isInLibrary = library?.some((b) => b.id === book.id);

        return (
          <div key={book.id} style={styles.bookItem}>
            {book.thumbnail && (
              <img
                src={book.thumbnail}
                alt={book.title}
                style={styles.thumbnail}
              />
            )}
            <div style={styles.bookDetails}>
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
            </div>

            {/* Disable the button if the book is already in the library */}
            <button
              onClick={() => onSelectBook(book)}
              style={{
                ...styles.addButton,
                backgroundColor: isInLibrary ? "#ccc" : "#005254", // Grey out the button if the book is in the library
                cursor: isInLibrary ? "not-allowed" : "pointer",
              }}
              disabled={isInLibrary} // Disable the button if the book is already added
            >
              {isInLibrary ? "In Library" : "Add to Library"}
            </button>
          </div>
        );
      })
    ) : (
      <p>No results found.</p>
    )}
  </div>
);

// Define styles as a constant object
const styles = {
  resultsContainer: {
    marginTop: "99px",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "lightblue",
    width: "60%",
    maxWidth: "575px",
    height: "100%",
  },
  bookItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  thumbnail: {
    width: "50px",
    height: "75px",
    marginRight: "15px",
  },
  bookDetails: {
    flex: 1,
    marginRight: "15px",
  },
  addButton: {
    marginTop: "10px",
    marginRight: "20px",
    padding: "5px 10px",
    backgroundColor: "#005254",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100px",
    height: "55px",
    fontSize: "15px",
    fontWeight: "bold",
  },
};

export default SearchResults;