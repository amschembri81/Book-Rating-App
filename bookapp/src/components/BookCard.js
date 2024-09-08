import React from 'react';
import StarRating from './StarRating'; // Import the StarRating component for rating functionality

// BookCard component accepts 'book' data and 'onDeleteBook' function as props
function BookCard({ book, onDeleteBook }) {
  
  // Log the book data to ensure it's being passed correctly
  console.log("Rendering BookCard for:", book);

  return (
    <div style={styles.bookCard}>
      {/* Book title and delete button */}
      <div style={styles.titleContainer}>
        <h3>{book.title}</h3>
        {/* Delete button triggers the 'onDeleteBook' function, passing the book's id */}
        <button onClick={() => onDeleteBook(book.id)} style={styles.deleteButton}>
          Delete Book
        </button>
      </div>
      
      {/* Display the author; if not available, show 'Unknown Author' */}
      <p><strong>Author:</strong> {book.author || 'Unknown Author'}</p>

      {/* Display the genre; if not available, show 'Uncategorized' */}
      <p><strong>Genre:</strong> {book.genre || 'Uncategorized'}</p>

      {/* Render the book's thumbnail if it's available; otherwise, display a fallback message */}
      {book.thumbnail ? (
        <img
          src={book.thumbnail} // Thumbnail image source
          alt={`${book.title} thumbnail`} // Alt text for accessibility
          style={styles.thumbnail} // Apply thumbnail styles
        />
      ) : (
        <p>No thumbnail available</p> // Fallback if no thumbnail is provided
      )}

      {/* Include the StarRating component to display book rating */}
      <StarRating />
    </div>
  );
}

// Define the styles for the BookCard component
const styles = {
  bookCard: {
    backgroundColor: 'white', // Background color for the card
    padding: '15px', // Space around the content inside the card
    borderRadius: '8px', // Rounded corners
    marginBottom: '10px', // Space below each card
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Subtle shadow effect
    display: 'flex', // Flexbox layout for card
    flexDirection: 'column', // Arrange items in a column
    alignItems: 'flex-start', // Align items to the start of the column
  },
  titleContainer: {
    display: 'flex', // Flexbox layout for title and button
    justifyContent: 'space-between', // Space between title and delete button
    alignItems: 'center', // Align items vertically in the center
    width: '100%', // Ensure the container spans the full width of the card
  },
  deleteButton: {
    marginLeft: '15px', // Space between title and button
    borderRadius: '8px', // Rounded corners for the button
    backgroundColor: 'lightcoral', // Button background color
    color: 'white', // Button text color
    cursor: 'pointer', // Pointer cursor when hovering over the button
    width: '100px', // Fixed width for the button
    height: '40px', // Fixed height for the button
    border: 'none', // Remove default border styling
    fontSize: '14px', // Font size of the button text
  },
  thumbnail: {
    width: '50px', // Width of the book thumbnail
    height: '75px', // Height of the book thumbnail
    marginTop: '10px', // Space above the thumbnail image
    borderRadius: '4px', // Slightly rounded corners for the thumbnail
  },
};

export default BookCard;