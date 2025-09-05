import React, { useState, useRef, useEffect } from "react";

function VideoPlayer({ videos, esercizioId, activeVideoId, setActiveVideoId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const thisVideoUniqueId = esercizioId + "-" + currentIndex;
  const videosWithoutLast = videos.slice(0, videos.length - 1);

  // Funzione per verificare se l'URL è un'immagine
  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
  };

  useEffect(() => {
    if (!videoRef.current) return;

    if (activeVideoId === thisVideoUniqueId && !isImage(videosWithoutLast[currentIndex])) {
      videoRef.current.play();
      setShowControls(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    } else if (videoRef.current) {
      videoRef.current.pause();
      clearTimeout(timeoutRef.current);
    }
  }, [activeVideoId, thisVideoUniqueId, currentIndex]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

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

  // Icone
  const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <polygon points="6,4 20,12 6,20" fill="currentColor" />
    </svg>
  );

  const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="6" y="4" width="4" height="16" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" fill="currentColor" />
    </svg>
  );

  const LeftArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <polygon points="15,4 7,12 15,20" fill="currentColor" />
    </svg>
  );

  const RightArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <polygon points="9,4 17,12 9,20" fill="currentColor" />
    </svg>
  );

  const isPlaying = activeVideoId === thisVideoUniqueId;

  return (
    <div
      ref={containerRef}
      className="content-video"
      onClick={() => setShowControls(true)}
    >
      {isImage(videosWithoutLast[currentIndex]) ? (
        <img
          src={videosWithoutLast[currentIndex]}
          alt={`Esercizio ${currentIndex}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      ) : (
        <video
          ref={videoRef}
          src={videosWithoutLast[currentIndex]}
          style={{ width: "100%", height: "auto", display: "block" }}
          loop
        />
      )}

      {showControls && !isImage(videosWithoutLast[currentIndex]) && (
        <>
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