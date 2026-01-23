import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import Results from "./components/Results.jsx";
import ImageResults from "./components/ImageResults.jsx";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [phonetic, setPhonetic] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (word) => {
    if (!word) {
      setResults([]);
      setPhonetic("");
      setAudioUrl("");
      setImages([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // --- SheCodes dictionary API ---
      const sheCodesApiKey = "ctec04f17ee45ebe9b5ffoa34af106fa";
      const sheCodesUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${sheCodesApiKey}`;
      const response = await axios.get(sheCodesUrl);
      const wordData = response.data;

      setResults(wordData.meanings || []);
      setPhonetic(wordData.phonetic || "");

      // --- dictionaryapi.dev to get audio ---
      try {
        const dictApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const dictResponse = await axios.get(dictApiUrl);
        const phoneticsArray = dictResponse.data[0]?.phonetics || [];
        const audioObj = phoneticsArray.find((p) => p.audio);
        setAudioUrl(audioObj ? audioObj.audio : "");
      } catch {
        setAudioUrl("");
      }

      // --- Pexels API for images ---
      try {
        const pexelsResponse = await axios.get(
          `https://api.pexels.com/v1/search?query=${word}&per_page=12`,
          {
            headers: {
              Authorization: import.meta.env.VITE_PEXELS_API_KEY,
            },
          },
        );
        setImages(pexelsResponse.data.photos || []);
      } catch {
        setImages([]);
      }
    } catch (err) {
      setError("Unable to fetch results. Please try again.");
      setResults([]);
      setPhonetic("");
      setAudioUrl("");
      setImages([]);
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

      {images.length > 0 && <ImageResults images={images} />}
    </main>
  );
}

export default App;
