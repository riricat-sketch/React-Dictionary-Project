import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
      role="search"
      aria-label="Dictionary search form"
    >
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter a word..."
        aria-label="Search input"
      />
      <button type="submit" aria-label="Search button">
        <span aria-hidden="true">🔍</span>
      </button>
    </form>
  );
}

export default SearchBar;
