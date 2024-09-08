import React, { useEffect } from "react";
import BookCard from "../components/BookCard";

function LibraryPage({ library, onUpdateBookStatus, onDeleteBook }) {
  // useEffect hook to log messages whenever the component mounts or the library prop changes
  useEffect(() => {
    console.log("LibraryPage mounted");
    console.log("Library received in LibraryPage:", library);
  }, [library]);

  // Separate the books into categories based on their status
  const wantToReadBooks = library.filter((book) => book.status === "Want to Read");
  const currentlyReadingBooks = library.filter((book) => book.status === "Currently Reading");
  const finishedBooks = library.filter((book) => book.status === "Finished");

  return (
    <div style={styles.libraryContainer}>
      {/* Section with two columns: "Want to Read" and "Currently Reading" */}
      <div style={styles.columnsContainer}>
        {/* "Want to Read" column */}
        <div style={styles.column}>
          <h3>Want to Read</h3>
          {/* Check if there are books with "Want to Read" status */}
          {wantToReadBooks.length > 0 ? (
            wantToReadBooks.map((book) => (
              <div key={book.id} style={styles.bookItem}>
                <BookCard book={book} onDeleteBook={onDeleteBook} />
                {/* Dropdown to update the book's status */}
                <select
                  value={book.status}
                  onChange={(e) => onUpdateBookStatus(book.id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Want to Read">Want to Read</option>
                  <option value="Currently Reading">Currently Reading</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>
            ))
          ) : (
            <p>No books in "Want to Read" status.</p>  // Message if no books in this category
          )}
        </div>

        {/* "Currently Reading" column */}
        <div style={styles.column}>
          <h3>Currently Reading</h3>
          {/* Check if there are books with "Currently Reading" status */}
          {currentlyReadingBooks.length > 0 ? (
            currentlyReadingBooks.map((book) => (
              <div key={book.id} style={styles.bookItem}>
                <BookCard book={book} onDeleteBook={onDeleteBook} />
                {/* Dropdown to update the book's status */}
                <select
                  value={book.status}
                  onChange={(e) => onUpdateBookStatus(book.id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Want to Read">Want to Read</option>
                  <option value="Currently Reading">Currently Reading</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>
            ))
          ) : (
            <p>No books in "Currently Reading" status.</p>  // Message if no books in this category
          )}
        </div>
      </div>

      {/* Full-width container for "Finished" books */}
      <div style={styles.finishedContainer}>
        <h3>Library: Finished Books</h3>
        {/* Check if there are books with "Finished" status */}
        {finishedBooks.length > 0 ? (
          finishedBooks.map((book) => (
            <div key={book.id} style={styles.bookItem}>
              <BookCard book={book} onDeleteBook={onDeleteBook} />
              {/* Dropdown to update the book's status */}
              <select
                value={book.status}
                onChange={(e) => onUpdateBookStatus(book.id, e.target.value)}
                style={styles.select}
              >
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
          ))
        ) : (
          <p>No books in "Finished" status.</p>  // Message if no books in this category
        )}
      </div>
    </div>
  );
}

// Styles for the LibraryPage component
const styles = {
  libraryContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "20px",  // Adds space between the sections
  },
  columnsContainer: {
    display: "flex",
    justifyContent: "space-between",  // Distributes space between the two columns
    gap: "20px",  // Adds space between the columns
  },
  column: {
    flex: 1,  // Ensures both columns take equal width
    padding: "20px",
    backgroundColor: "#ADD8E6",  // Light blue background color for columns
    borderRadius: "8px",  // Rounded corners
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Adds subtle shadow for depth
  },
  finishedContainer: {
    width: "100%",  // Takes full width for "Finished" section
    padding: "20px",
    backgroundColor: "#CBC3E3",  // Light purple background color for the "Finished" section
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Adds subtle shadow for depth
  },
  bookItem: {
    marginBottom: "15px",  // Adds space between book cards
  },
  select: {
    marginTop: "10px",  // Adds space between the dropdown and the book card
    padding: "5px",
    fontSize: "16px",
    borderRadius: "4px",  // Rounded corners for the dropdown
    borderColor: "#ccc",  // Light grey border for the dropdown
  },
};

export default LibraryPage;