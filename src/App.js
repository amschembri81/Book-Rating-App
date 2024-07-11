import React, { useState } from "react";
import BookCard from "./BookCard";
import SearchBook from "./SearchBook";
import AddBookForm from "./AddBookForm";
import Header from './Header';
import "./App.css";

const bookList = [
  {
    id: 0,
    name: "Little Fires Everywhere",
    author: "Celeste Ng",
    rating: null,
    category: "Contemporary Fiction",
  },
  {
    id: 1,
    name: "Pride and Prejudice",
    author: "Jane Austen",
    rating: null,
    category: "Fiction",
  },
  {
    id: 2,
    name: "When Among Crows",
    author: "Veronica Roth",
    rating: null,
    category: "Fantasy",
  },
  {
    id: 3,
    name: "The Ministry of Time",
    author: "Kaliane Bradley",
    rating: null,
    category: "Science Fiction",
  },
  {
    id: 4,
    name: "The Girl on the Train",
    author: "Paula Hawkins",
    rating: null,
    category: "Thriller",
  },
  {
    id: 5,
    name: "Bobby Truax",
    author: "Denise Cassino",
    rating: null,
    category: "Crime",
  },
  {
    id: 6,
    name: "I Know Why the Caged Bird Sings",
    author: "Maya Angelou",
    rating: null,
    category: "Autobiography",
  },
  {
    id: 7,
    name: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    rating: null,
    category: "Nonfiction",
  },
];


function App() {
  const [filteredBooks, setFilteredBooks] = useState(bookList);
  const [books, setBooks] = useState(bookList);

  const handleSubmit = (newBook) => {
    const updatedBooks = [...books, { id: books.length, ...newBook }];
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const handleDeleteBook = (bookId) => {
    const newList = books.filter((book) => book.id !== bookId);
    setBooks(newList);
    setFilteredBooks(newList);
  };

  const handleSearch = (query) => {
    const lowercasedValue = query.toLowerCase().trim();
    if (!lowercasedValue) {
      setFilteredBooks(bookList);
      return;
    }

    const filtered = bookList.filter((book) =>
      Object.values(book).join(" ").toLowerCase().includes(lowercasedValue)
    );

    setFilteredBooks(filtered);
  };

  return (
    <div className="App">
      <Header>
        <img src="/4478856.jpg" alt="Book Rating App" style={{ width: 100, height: 100 }} id="image" />
        <h1>My Book Rating App</h1>
      </Header>
      
      <div className="container-with-border">
        <AddBookForm onAddBook={handleSubmit} />
      </div>

      <div className="container-with-border">
        <SearchBook onSearch={handleSearch} />
      </div>

      <div className="book-list">
        {filteredBooks.map((b) => (
          <BookCard key={b.id} book={b} onDeleteBook={handleDeleteBook} />
        ))}
      </div>
    </div>
  );
}

export default App;