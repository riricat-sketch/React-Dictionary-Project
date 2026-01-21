import React, { useRef } from "react";

function Phonetics({ phonetic, audioUrl }) {
  const audioRef = useRef(null);

  if (!phonetic && !audioUrl) return null;

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div
      className="phonetics"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "12px",
      }}
    >
      {phonetic && <span className="phonetic-text">{phonetic}</span>}

      {audioUrl && (
        <>
          <button
            onClick={playAudio}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontSize: "1.4rem",
              lineHeight: 1,
            }}
            aria-label="Play pronunciation"
            title="Play pronunciation"
          >
            🔊
          </button>
          <audio ref={audioRef} src={audioUrl} />
        </>
      )}
    </div>
  );
}

export default Phonetics;
