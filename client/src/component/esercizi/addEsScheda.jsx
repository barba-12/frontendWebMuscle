import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link, useLocation, useNavigate } from "react-router-dom";
import exerciseData from "../../data/exercise";
import AddEsercizio from "./addEsercizio";

function addEsScheda() {
  const [es, setEs] = useState(exerciseData);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [button, setButton] = useState(true);
  const [idEs, setIdEs] = useState([]);
  const navigate = useNavigate();

  return (
    <Container fluid className="project-section">
      <Container>
        <Button variant="primary" onClick={() => navigate(-1)}>back</Button>

        <h1 className="project-heading">Select Exercise</h1>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {es.map((ex, i) => (
            <Col md={4} className="project-card" key={i}>
              <AddEsercizio
                esercizio={ex}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default addEsScheda;