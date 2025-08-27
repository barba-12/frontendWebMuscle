import React, { useState, useEffect, useImperativeHandle } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import exerciseData from "../../data/exercise";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { getAllSchede } from "../../db/indexedDB";

function PaginaEsercizi({ esercizi }) {
  const location = useLocation();
  const [es, setEs] = useState(esercizi);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const navigate = useNavigate();

  const scaricaJSON = async () => {
    // Recupera le schede da IndexedDB
    const schede = await getAllSchede();

    // Converti l'array di schede in JSON
    const jsonString = JSON.stringify(schede, null, 2); // null,2 per indentazione leggibile

    // Crea un blob e un URL per il download
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Crea un link temporaneo e cliccalo per avviare il download
    const link = document.createElement("a");
    link.href = url;
    link.download = "schede.json";
    document.body.appendChild(link);
    link.click();

    // Pulisci il DOM
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Container fluid className="project-section">
      <Container>
        <Link to="/schede">
          <Button variant="primary">Schede</Button>
        </Link>

        <Button variant="primary" style={{marginLeft:"30px"}} onClick={scaricaJSON}>Scarica JSON</Button>

        <h1 className="project-heading">Exercise</h1>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {es.map((ex, i) => {
            console.log("Esercizio:", ex); // stampa ogni elemento dell’array es
            return (
              <Col md={4} className="project-card" key={i}>
                <Esercizio
                  esercizio={ex}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

export default PaginaEsercizi;