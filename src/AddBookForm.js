import React, { useState } from "react";

function AddBookForm({ onAddBook }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook({ name, author, category });
    setName("");
    setAuthor("");
    setCategory("");
  };

  return (
    <div id="container" className="container" style={{ display: 'flex', alignItems: 'center' }}>
      <form onSubmit={handleSubmit}>
        <h3>Add a New Book</h3>
        
        <label htmlFor="name">Book Title:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="form-input"
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" id="addbook">Add Book</button>
      </form>
    </div>
  );
}

export default AddBookForm;
