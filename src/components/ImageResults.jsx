import React from "react";

function ImageResults({ images }) {
  return (
    <section className="image-results" aria-label="Related images">
      <h2>Images</h2>
      <div className="image-grid">
        {images.map((img) => (
          <a
            key={img.id}
            href={img.url}
            target="_blank"
            rel="noopener noreferrer"
            title={img.alt || "Related image"}
          >
            <img
              src={img.src.medium}
              alt={img.alt || "Related to search"}
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default ImageResults;
