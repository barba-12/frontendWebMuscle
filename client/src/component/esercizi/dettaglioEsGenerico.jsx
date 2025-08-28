import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import exerciseData from "../../data/exercise";

function esercizioScheda() {
  const navigate = useNavigate();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { esercizioId } = useParams();
  const [esercizioRaw, setEsercizioRaw] = useState(exerciseData.find(es => es.id == esercizioId));

  return (
    <Card className="project-card-view">
      <Button variant="primary" onClick={() => navigate(-1)}>back</Button>
      <Card.Body>
        {esercizioRaw.immaginiVideo && esercizioRaw.immaginiVideo.length > 0 && (
          <VideoPlayer
            videos={esercizioRaw.immaginiVideo}
            esercizioRawId={esercizioRaw.id}
            activeVideoId={activeVideoId}
            setActiveVideoId={setActiveVideoId}
          />
        )}

        <h1>{esercizioRaw.nome}</h1>

        {esercizioRaw.descrizione.split('|').map((sezione, i) => (
          sezione.split("§").map((sezione, i) => (
            <p key={i} style={{textAlign:"left"}}>{sezione.trim()}</p>
          ))
        ))}

        <img 
          src={esercizioRaw.immaginiVideo[esercizioRaw.immaginiVideo.length - 1]} 
          alt="Ultima immagine" 
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card.Body>
    </Card>
  );
}

export default esercizioScheda;