import React, { useState, useEffect, use } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import exerciseData from "../../data/exercise";
import { getAllSchede } from "../../db/indexedDB";

function ExerciseCard({ esercizio, activeVideoId, setActiveVideoId }) {
  const [showForm, setShowForm] = useState(false);
  const [giorno, setGiorno] = useState("");
  const [serie, setSerie] = useState();
  const [ripetizioni, setRipetizioni] = useState();
  const [carico, setCarico] = useState();
  const [tempoRecupero, setTempoRecupero] = useState();
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
          <strong className="purple">Muscoli allenati:</strong> {esercizioRaw.muscoliAllenati}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Attrezzatura:</strong> {esercizioRaw.attrezzatura}
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