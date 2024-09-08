import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/Lottie.json';
import { nytApiKey } from '../config';

function HomeScreen({ onAddToLibrary }) {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    // Fetch the NYT Bestsellers list when the component mounts
    const fetchBestsellers = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nytApiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch NYT Bestsellers');
        }
        const data = await response.json();
        setBestsellers(data.results.books.slice(0, 10)); // Store the top 10 books in state
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
      }
    };

    fetchBestsellers(); // Call the function to fetch data
  }, []);

  const handleAddToLibrary = (book) => {
    // Prepare the book object with the necessary fields
    const newBook = {
      id: book.rank, // Use the book's rank as a unique identifier
      title: book.title,
      author: book.author,
      genre: book.genre || 'Uncategorized', // Provide a default genre if not available
      thumbnail: book.book_image,
      description: book.description,
      status: 'Want to Read', // Set the default status
    };
    onAddToLibrary(newBook); // Call the function passed as a prop to add the book to the library
  };

  return (
    <div className="App">
      <div style={styles.container}>
        {/* Lottie Animation */}
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={200}
          width={200}
        />

        {/* Welcome Text */}
        <h1 style={styles.welcomeText}>Welcome to My Book App</h1>

        {/* NYT Bestsellers List */}
        <div style={styles.bestsellerContainer}>
          <h3>NYT Bestsellers</h3>
          <div style={styles.bookGrid}>
            {bestsellers.map((book) => (
              <div key={book.rank} style={styles.bookCard}>
                <img
                  src={book.book_image}
                  alt={book.title}
                  style={styles.bookCover}
                />
                <div style={styles.bookInfo}>
                  <h4>{book.title}</h4>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre || 'Uncategorized'}</p>
                  <p><strong>Weeks on list:</strong> {book.weeks_on_list}</p>
                  <p><strong>Description:</strong> {book.description}</p>
                  <button
                    onClick={() => handleAddToLibrary(book)}
                    style={styles.addButton}
                  >
                    Add to Library
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    flexGrow: 1, // Allow the container to grow and take up available space
    display: 'flex', // Use flexbox layout for the container
    flexDirection: 'column', // Arrange children in a column
    alignItems: 'center', // Center children horizontally
    padding: '20px', // Add padding around the container
    boxSizing: 'border-box', // Include padding in the element's height and width
    minHeight: '100%', // Ensure the container takes up the entire height of the page
    backgroundColor: 'transparent', // Set background color to transparent
  },
  welcomeText: {
    fontSize: '30px', // Set font size for the welcome text
    fontWeight: 'bold', // Make the text bold
    margin: '20px 0', // Add vertical margin around the text
    color: '#333', // Set text color
  },
  bestsellerContainer: {
    marginTop: '30px', // Add margin above the container
    width: '100%', // Take up the full width of the container
    maxWidth: '800px', // Limit the maximum width
  },
  bookGrid: {
    display: 'grid', // Use grid layout for the book cards
    gridTemplateColumns: '1fr 1fr', // Create two equal columns
    gap: '20px', // Add space between grid items
  },
  bookCard: {
    display: 'flex', // Use flexbox layout for the book card
    flexDirection: 'column', // Arrange children in a column
    alignItems: 'center', // Center children horizontally
    padding: '10px', // Add padding inside the card
    backgroundColor: '#fff', // Set the background color to white
    borderRadius: '8px', // Round the corners of the card
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
  },
  bookCover: {
    width: '80px', // Set the width of the book cover image
    height: '120px', // Set the height of the book cover image
    marginBottom: '10px', // Add margin below the image
  },
  bookInfo: {
    textAlign: 'center', // Center-align the text
  },
  addButton: {
    marginTop: '10px', // Add margin above the button
    padding: '5px 10px', // Add padding inside the button
    backgroundColor: '#87ceeb', // Set the background color of the button
    color: '#fff', // Set the text color to white
    border: 'none', // Remove the border
    borderRadius: '4px', // Round the corners of the button
    cursor: 'pointer', // Change the cursor to a pointer on hover
  },
};

export default HomeScreen;