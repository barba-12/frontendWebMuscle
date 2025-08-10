import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Esercizio from "./esercizio";  // assicurati che il componente si chiami così
import exerciseData from '../data/exercise';

function PaginaEsercizi() {
  const [esercizi, setEsercizi] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    setEsercizi(exerciseData);
  }, []);

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          Exercise
        </h1>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {esercizi.map((ex) => (
            <Col md={4} className="project-card" key={ex.id}>
              <Esercizio esercizio={ex} activeVideoId={activeVideoId} setActiveVideoId={setActiveVideoId} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default PaginaEsercizi;