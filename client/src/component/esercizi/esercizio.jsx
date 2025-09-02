import { Button, Card } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";

function ExerciseCard({ esercizio, activeVideoId, setActiveVideoId }) {
   //AGGIUNGERE CONTROLLI NON HTML5
  return (
    <Card className="project-card-view">
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
          <strong className="purple">Muscoli allenati:</strong> {esercizio.muscoliAllenati.join(" - ")}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Attrezzatura:</strong> {esercizio.attrezzatura.join(" - ")}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Difficoltà:</strong> {esercizio.difficoltà}
        </Card.Text>
        
        <Link to={`/dettaglioEsGenerico/${esercizio.id}`}>
          <Button variant="primary">
            visualizza dettagli
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;