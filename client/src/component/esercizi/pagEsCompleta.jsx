import {React , useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import VideoPlayer from "../videoPlayer";

function pagEsCompleta() {
  const navigate = useNavigate();
  const location = useLocation();
  const { esercizio } = location.state || {};
  const [activeVideoId, setActiveVideoId] = useState(null);

  const isEsercizioScheda = esercizio && typeof esercizio.ripetizioni !== "undefined";

  return (
    <Card className="project-card-view">
      <Button variant="primary" onClick={() => navigate(-1)}>back</Button>

      <Card.Body>
        {esercizio.immaginiVideo && esercizio.immaginiVideo.length > 0 && (
          <VideoPlayer
            videos={esercizio.immaginiVideo}
            esercizioId={esercizio.id}
            activeVideoId={activeVideoId}
            setActiveVideoId={setActiveVideoId}
          />
        )}

        <h1>{esercizio.nome}</h1>

        {isEsercizioScheda && (
          <>
            <h2>Num serie: {esercizio.serie}</h2>
            <h2>Num rep (x serie): {esercizio.ripetizioni}</h2>
            <h2>Peso: {esercizio.carico}</h2>
            <h2>Tempo di recupero: {esercizio.tempoRecupero}s</h2>
            <h2>Conferma esercizio fatto</h2>
            <h2>Grafico del peso per ogni settimana</h2>
          </>
        )}

        {esercizio.descrizione.split('|').map((sezione, i) => (
          sezione.split("§").map((sezione, i) => (
            <p key={i} style={{textAlign:"left"}}>{sezione.trim()}</p>
          ))
        ))}

        <img 
          src={esercizio.immaginiVideo[esercizio.immaginiVideo.length - 1]} 
          alt="Ultima immagine" 
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card.Body>
    </Card>
  );
}

export default pagEsCompleta;