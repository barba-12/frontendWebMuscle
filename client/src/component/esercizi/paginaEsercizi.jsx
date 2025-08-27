import React, { useState, useEffect, useImperativeHandle } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import exerciseData from "../../data/exercise";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { openDB } from "../../db/indexedDB";

function PaginaEsercizi({ esercizi }) {
  const location = useLocation();
  const [es, setEs] = useState(esercizi);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const STORE_NAME = "schede";
  const navigate = useNavigate();

  const scaricaJSON = async () => {
    const db = await openDB();

    // prendo tutte le schede da IndexedDB
    const schedeDB = await new Promise((resolve) => {
      const req = db.transaction(STORE_NAME, "readonly")
        .objectStore(STORE_NAME)
        .getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve([]);
    });

    // preparo solo i dati numerici da esportare
    const schedeExport = schedeDB.map((scheda) => ({
      id: scheda.id,
      esercizi: scheda.esercizi.map((ex) => ({
        idUnivoco: ex.idUnivoco,
        ripetizioni: ex.ripetizioni || [],
        carico: ex.carico || [],
        tempoRecupero: ex.tempoRecupero || [],
      })),
    }));

    // download JSON
    const jsonString = JSON.stringify(schedeExport, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "schede.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // resetto i campi numerici in IndexedDB
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    schedeDB.forEach((scheda) => {
      scheda.esercizi = scheda.esercizi.map((ex) => ({
        ...ex,
        ripetizioni: [],
        carico: [],
        tempoRecupero: [],
      }));
      store.put(scheda);
    });
    await tx.done;
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