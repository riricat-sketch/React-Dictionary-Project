import React from "react";

function Results({ results }) {
  return (
    <section
      className="results-container"
      aria-live="polite"
      aria-label="Search results"
    >
      {results.length === 0 ? (
        <p className="no-results">No results to display.</p>
      ) : (
        results.map(({ word, definition }) => (
          <div key={word} className="result-item">
            <h3>{word}</h3>
            <p>{definition}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default Results;
