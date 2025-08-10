import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import VideoPlayer from "./videoPlayer";

function ExerciseCard({ esercizio, activeVideoId, setActiveVideoId }) {
  const [showVideos, setShowVideos] = useState(false);

  return (
    <Card className="project-card-view">
      {/* Video o immagine anteprima */}
      {esercizio.immaginiVideo && esercizio.immaginiVideo.length > 0 && (
        <VideoPlayer
          videos={esercizio.immaginiVideo}
          esercizioId={esercizio.id}
          activeVideoId={activeVideoId}
          setActiveVideoId={setActiveVideoId}
        />
      )}

      <Card.Body>
        <Card.Title>{esercizio.nome}</Card.Title>

        <Card.Text>
          <strong className="purple">Muscoli allenati:</strong> {esercizio.muscoliAllenati.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Attrezzatura:</strong> {esercizio.attrezzatura}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Difficoltà:</strong> {esercizio.difficoltà}
        </Card.Text>

        <Button>
          visualizza dettagli
        </Button>

      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;