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

  return (
    <Container fluid className="project-section">
      <Container>
        <Link to="/schede">
          <Button variant="primary">Schede</Button>
        </Link>

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