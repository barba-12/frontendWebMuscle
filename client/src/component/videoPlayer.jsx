import React, { useState, useRef, useEffect } from "react";

function VideoPlayer({ videos, esercizioId, activeVideoId, setActiveVideoId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const thisVideoUniqueId = esercizioId + "-" + currentIndex;
  const videosWithoutLast = videos.slice(0, videos.length - 1);

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
    setCurrentIndex((prev) => (prev + 1) % videosWithoutLast.length);
    setActiveVideoId(null);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? videosWithoutLast.length - 1 : prev - 1));
    setActiveVideoId(null);
  };

// Play
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <polygon points="6,4 20,12 6,20" fill="currentColor" />
  </svg>
);

// Pause
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <rect x="6" y="4" width="4" height="16" fill="currentColor" />
    <rect x="14" y="4" width="4" height="16" fill="currentColor" />
  </svg>
);

// Freccia sinistra
const LeftArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <polygon points="15,4 7,12 15,20" fill="currentColor" />
  </svg>
);

// Freccia destra
const RightArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <polygon points="9,4 17,12 9,20" fill="currentColor" />
  </svg>
);



  const isPlaying = activeVideoId === thisVideoUniqueId;
  const showButtons = !isPlaying || isHovered;

  return (
    <div
      className="content-video"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={videosWithoutLast[currentIndex]}
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
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          {videosWithoutLast.length > 1 && (
            <>
              <button onClick={prevVideo} className="botton-left" aria-label="Previous video">
                <LeftArrow />
              </button>
              <button onClick={nextVideo} className="botton-right" aria-label="Next video">
                <RightArrow />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default VideoPlayer;