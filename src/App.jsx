import React, { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import Results from "./components/Results.jsx";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${value}?key=ctec04f17ee45ebe9b5ffoa34af106fa`
      );

      // Check for valid results
      if (!response.data || response.data.length === 0) {
        setResults([]);
        setError("No results found.");
      } else {
        // Filter to get only dictionary entries with shortdef
        const filteredResults = response.data
          .filter((entry) => entry.shortdef && entry.shortdef.length > 0)
          .map((entry) => ({
            word: entry.meta.id,
            definition: entry.shortdef.join("; "),
          }));

        if (filteredResults.length === 0) {
          setError("No valid definitions found.");
        }

        setResults(filteredResults);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <h1>React Dictionary</h1>
      <p className="subtitle">Search for a word to see definitions.</p>
      <SearchBar onSearch={handleSearch} />
      {loading ? <p className="loading">Loading...</p> : null}
      {error && <p className="error">{error}</p>}
      <Results results={results} />
    </main>
  );
}

export default App;
