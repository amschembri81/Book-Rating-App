import React, { useState } from "react";

function SearchBook({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div id="container" className="container" style={{ display: 'flex', alignItems: 'center' }}>
      <h3 id="searchforbook">Search For a Book</h3>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="form-input"
      />
    </div>
  );
}

export default SearchBook;