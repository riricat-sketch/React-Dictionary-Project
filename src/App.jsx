import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import Results from "./components/Results.jsx";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (word) => {
    if (!word) {
      setResults([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiKey = "ctec04f17ee45ebe9b5ffoa34af106fa";
      const url = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;

      const response = await axios.get(url);

      // SheCodes API returns an object with meanings array
      const wordData = response.data;

      if (!wordData.meanings || wordData.meanings.length === 0) {
        setError("No definitions found.");
        setResults([]);
        return;
      }

      setResults(wordData.meanings); // THIS is the array your Results component expects
    } catch (err) {
      console.error(err);
      setError("Unable to fetch results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <h1>Dictionary</h1>
      <p className="subtitle">Search for a word to see its definition.</p>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="loading">Loading…</p>}
      {error && <p className="error">{error}</p>}

      <Results results={results} />
    </main>
  );
}

export default App;
