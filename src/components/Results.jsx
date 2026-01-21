import React from "react";
import Phonetics from "./Phonetics";

function Results({ results, phonetic, audioUrl }) {
  if (!results || results.length === 0) {
    return <p className="no-results">No results to display.</p>;
  }

  return (
    <section className="results-container" aria-live="polite">
      <Phonetics phonetic={phonetic} audioUrl={audioUrl} />

      {results.map((item, index) => (
        <div key={index} className="result-item">
          <h3 className="part-of-speech">{item.partOfSpeech}</h3>
          <p className="definition">{item.definition}</p>

          {item.example && (
            <p className="example">
              <em>“{item.example}”</em>
            </p>
          )}

          {item.synonyms && item.synonyms.length > 0 && (
            <div className="synonyms">
              <div className="synonyms-title">Synonyms</div>
              <div className="synonyms-list">
                {item.synonyms.map((synonym, i) => (
                  <span key={i} className="synonym">
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default Results;
