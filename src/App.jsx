import React, { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import Results from "./components/Results.jsx";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const dictionary = {
    apple: "A fruit that grows on trees.",
    banana: "A long yellow fruit.",
    cat: "A small domesticated carnivorous mammal.",
    dog: "A domesticated carnivorous mammal that barks.",
  };

  const handleSearch = (value) => {
    const searchValue = value.trim().toLowerCase();
    setQuery(searchValue);

    const filtered = Object.keys(dictionary)
      .filter((word) => word.includes(searchValue))
      .map((word) => ({ word, definition: dictionary[word] }));

    setResults(filtered);
  };

  return (
    <main className="app-container">
      <h1>Welcome to React Dictionary Project</h1>
      <SearchBar onSearch={handleSearch} />
      <Results results={results} />
    </main>
  );
}

export default App;
