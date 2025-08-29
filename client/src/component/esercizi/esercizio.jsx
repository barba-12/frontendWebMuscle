import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";

function ExerciseCard({ esercizio, activeVideoId, setActiveVideoId }) {
  const [esercizioRaw, setEsercizioRaw] = useState(esercizio);

   //AGGIUNGERE CONTROLLI NON HTML5
  return (
    <Card className="project-card-view">
      {esercizioRaw.immaginiVideo && esercizioRaw.immaginiVideo.length > 0 && (
        <VideoPlayer
          videos={esercizioRaw.immaginiVideo}
          esercizioId={esercizioRaw.id}
          activeVideoId={activeVideoId}
          setActiveVideoId={setActiveVideoId}
        />
      )}

      <Card.Body>
        <Card.Title>{esercizioRaw.nome}</Card.Title>

        <Card.Text>
          <strong className="purple">Muscoli allenati:</strong> {esercizioRaw.muscoliAllenati.join(" - ")}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Attrezzatura:</strong> {esercizioRaw.attrezzatura.join(" - ")}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Difficoltà:</strong> {esercizioRaw.difficoltà}
        </Card.Text>
        
        <Link to={`/dettaglioEsGenerico/${esercizioRaw.id}`}>
          <Button variant="primary">
            visualizza dettagli
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;