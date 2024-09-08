import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import LibraryPage from "./pages/LibraryPage";
import SearchBook from "./components/SearchBook";
import SearchResults from "./components/SearchResults";
import MyAccount from "./pages/MyAccount";
import LoginPage from "./pages/LoginPage";

function App() {
  // State to manage the list of books in the library
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem("books");
      return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
      console.error("Error loading books from localStorage:", error);
      toast.error("Failed to load books from storage.");
      return [];
    }
  });

  // State to manage the search results from the Google Books API
  const [searchResults, setSearchResults] = useState([]);

  // useEffect hook to save the 'books' state to localStorage with a debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem("books", JSON.stringify(books));
        console.log("Saving books to localStorage:", books);
      } catch (error) {
        console.error("Error saving books to localStorage:", error);
        toast.error("Failed to save books to storage. Storage limit may be reached.");
      }
    }, 500); // Save after 500ms of inactivity

    return () => clearTimeout(timeout); // Cleanup timeout on unmount or before the effect runs again
  }, [books]);

  // Function to handle selecting a book from the search results
  const handleSelectBook = (book) => {
    console.log("Selected Book:", book); // Check if the selected book is logged

    // Avoid adding duplicate books
    const isBookInLibrary = books.some((b) => b.id === book.id);
    if (!isBookInLibrary) {
      const updatedBooks = [...books, { ...book, status: "Want to Read" }];
      setBooks(updatedBooks); // Add the selected book to the library state
      console.log("Updated Books in Library:", updatedBooks); // Log to see if the book is added
      toast.success(`"${book.title}" added to your library!`);
    } else {
      toast.info(`"${book.title}" is already in your library.`);
    }

    // Clear search results only after the book is added
    setTimeout(() => {
      setSearchResults([]);
      console.log("Search results cleared");
    }, 1000); // Optional delay to ensure the flow
  };

  // Function to handle updating book status
  const handleUpdateBookStatus = (id, status) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, status } : book
    );
    setBooks(updatedBooks);
    toast.info(`Status updated to "${status}"`);
  };

  // Function to handle deleting a book
  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    toast.warn("Book removed from your library.");
  };

  return (
    <Router>
      <Navbar />
      <div style={styles.pageContainer}>
        <ToastContainer position="top-right" autoClose={3000} /> {/* Toast container */}
        <Routes>
          {/* Route for the Home Screen */}
          <Route path="/" element={<HomeScreen />} />

          {/* Route for the Library Page */}
          <Route
            path="/library"
            element={
              <LibraryPage
                library={books} // Pass the updated books array to LibraryPage
                onUpdateBookStatus={handleUpdateBookStatus}
                onDeleteBook={handleDeleteBook}
              />
            }
          />

          {/* Route for searching and adding a book */}
          <Route
            path="/search-book"
            element={
              <>
                <SearchBook setSearchResults={setSearchResults} />
                <SearchResults
                  searchResults={searchResults}
                  onSelectBook={handleSelectBook}
                  library={books} // Pass the `books` array as `library`
                />
              </>
            }
          />

          {/* Route for the My Account Page */}
          <Route path="/my-account" element={<MyAccount />} />

          {/* Route for the Login Page */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
  },
};

export default App;