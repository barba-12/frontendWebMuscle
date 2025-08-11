import React, { useState, useRef, useEffect } from "react";

function VideoPlayer({ videos, esercizioId, activeVideoId, setActiveVideoId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const thisVideoUniqueId = esercizioId + "-" + currentIndex;

  useEffect(() => {
    if (!videoRef.current) return;

    if (activeVideoId === thisVideoUniqueId) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [activeVideoId, thisVideoUniqueId]);

  const togglePlay = () => {
    if (activeVideoId === thisVideoUniqueId) {
      setActiveVideoId(null); // Pausa
    } else {
      setActiveVideoId(thisVideoUniqueId); // Play
    }
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setActiveVideoId(null);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setActiveVideoId(null);
  };

  const isPlaying = activeVideoId === thisVideoUniqueId;
  const showButtons = !isPlaying || isHovered;

  return (
    <div
      className="content-video"
      style={{ position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={videos[currentIndex]}
        style={{ width: "100%", height: "auto", display: "block" }}
        loop
      />

      {showButtons && (
        <>
          {/* Bottone Play/Pausa */}
          <button
            onClick={togglePlay}
            className="botton-pause"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? "❚❚" : "►"}
          </button>

          {/* Bottoni avanti/indietro */}
          {videos.length > 1 && (
            <>
              <button
                onClick={prevVideo}
                className="botton-left"
                aria-label="Previous video"
              >
                ⇦
              </button>
              <button
                onClick={nextVideo}
                className="botton-right"
                aria-label="Next video"
              >
                ⇨
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default VideoPlayer;