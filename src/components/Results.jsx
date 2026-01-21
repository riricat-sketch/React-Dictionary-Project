import React from "react";

function Results({ results }) {
  if (!results || results.length === 0) {
    return <p className="no-results">No results to display.</p>;
  }

  return (
    <section className="results-container" aria-live="polite">
      {results.map((item, index) => (
        <div key={index} className="result-item">
          <h3 className="part-of-speech">{item.partOfSpeech}</h3>
          <p className="definition">{item.definition}</p>

          {item.example && (
            <p className="example">
              <em>“{item.example}”</em>
            </p>
          )}

          {/* ✅ Synonyms Section */}
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
