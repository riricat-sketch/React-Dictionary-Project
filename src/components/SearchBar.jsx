import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

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
        placeholder="Search for a word"
        value={input}
        onChange={handleInputChange}
        aria-label="Search input"
      />
      <button type="submit" aria-label="Search button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
