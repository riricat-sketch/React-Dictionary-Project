import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import Results from "./components/Results.jsx";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [phonetic, setPhonetic] = useState("");
  const [audioUrl, setAudioUrl] = useState(""); // NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (word) => {
    console.log("Searching for:", word);

    if (!word) {
      setResults([]);
      setPhonetic("");
      setAudioUrl("");
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // --- SheCodes API for definitions & synonyms ---
      const apiKey = "ctec04f17ee45ebe9b5ffoa34af106fa";
      const sheCodesUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;

      const response = await axios.get(sheCodesUrl);
      const wordData = response.data;

      console.log("Full API response:", wordData);
      console.log("Phonetic from API:", wordData.phonetic);

      if (!wordData.meanings || wordData.meanings.length === 0) {
        setError("No definitions found.");
        setResults([]);
        setPhonetic("");
        setAudioUrl("");
        return;
      }

      setResults(wordData.meanings);
      setPhonetic(wordData.phonetic || "");

      // --- dictionaryapi.dev API for audio ---
      try {
        const dictApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const dictResponse = await axios.get(dictApiUrl);

        // Grab first audio URL available
        const phoneticsArray = dictResponse.data[0].phonetics;
        const audioObj = phoneticsArray.find((p) => p.audio);
        setAudioUrl(audioObj ? audioObj.audio : "");
      } catch (audioErr) {
        console.log("No audio available for this word");
        setAudioUrl(""); // fallback
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch results. Please try again.");
      setResults([]);
      setPhonetic("");
      setAudioUrl("");
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

      <Results results={results} phonetic={phonetic} audioUrl={audioUrl} />
    </main>
  );
}

export default App;
