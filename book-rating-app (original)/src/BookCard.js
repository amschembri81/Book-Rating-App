import React from "react";
import StarRating from "./StarRating";

function BookCard({ book, onDeleteBook }) {
  return (
    <div className="bg-light border p-4 m-2">
      <div className="title-container">
        <h3>{book.name}</h3>
        <button onClick={() => onDeleteBook(book.id)} id="delete">Delete Book</button>
      </div>
      <h5>Author: {book.author}</h5>
      <h6>Genre: {book.category}</h6>
      <StarRating />
    </div>
  );
}

export default BookCard;