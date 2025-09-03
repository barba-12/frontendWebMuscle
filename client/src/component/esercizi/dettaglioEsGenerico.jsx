import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import exerciseData from "../../data/exercise";

function EsercizioScheda() {
  const navigate = useNavigate();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [showDettagli, setShowDettagli] = useState(false); // stato per dettagli
  const { esercizioId } = useParams();
  const [esercizioRaw] = useState(
    exerciseData.find((es) => es.id == esercizioId)
  );

  // separa la descrizione in breve e dettagliata
  const [breve, dettagliata] = esercizioRaw.descrizione.split("|");
  
  // righe della spiegazione breve
  const righeBreve = breve.split("§").map(r => r.trim());
  
  // righe della spiegazione dettagliata (se esiste)
  const righeDettagliate = dettagliata ? dettagliata.split("§").map(r => r.trim()) : [];

  return (
    <Card className="project-card-view">
      <Button
        type="submit"
        variant="primary"
        onClick={() => navigate("/")}
        style={{ margin: "1rem" }}
      >
        Back
      </Button>
      <Card.Body>
        {/* Video */}
        {esercizioRaw.immaginiVideo && esercizioRaw.immaginiVideo.length > 0 && (
          <VideoPlayer
            videos={esercizioRaw.immaginiVideo}
            esercizioRawId={esercizioRaw.id}
            activeVideoId={activeVideoId}
            setActiveVideoId={setActiveVideoId}
          />
        )}

        {/* Nome esercizio */}
        <h1>{esercizioRaw.nome}</h1>

        {/* Spiegazione breve */}
        <div style={{ marginBottom: "1rem" }}>
          {righeBreve.map((riga, i) => (
            <p key={i} style={{ textAlign: "left", margin: "0.25rem 0" }}>
              {riga.trim()}
            </p>
          ))}
        </div>

        {righeDettagliate.length > 0 && (
          <button
            className="btn login-button"
            onClick={() => setShowDettagli(!showDettagli)}
          >
            {showDettagli ? "Nascondi spiegazione dettagliata" : "Visualizza spiegazione dettagliata"}
          </button>
        )}

        {/* Spiegazione dettagliata */}
        {showDettagli && (
          <div style={{ marginBottom: "1.5rem" }}>
            {righeDettagliate.map((riga, i) => (
              <p key={i} style={{ textAlign: "left", margin: "0.25rem 0" }}>
                {riga.trim()}
              </p>
            ))}
          </div>
        )}

        {/* Ultima immagine */}
        {esercizioRaw.immaginiVideo && esercizioRaw.immaginiVideo.length > 0 && (
          <img
            src={esercizioRaw.immaginiVideo[esercizioRaw.immaginiVideo.length - 1]}
            alt="Ultima immagine"
            style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default EsercizioScheda;