import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import exerciseData from "../../data/exercise";
import AddEsercizioAtScheda from "./addEsercizioAtScheda";

function addEsSchedaEsistente() {
  const [es, setEs] = useState(exerciseData);
  const { idScheda } = useParams();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const navigate = useNavigate();

  const changePag = () => {
    navigate("/schede");
  }

  return (
    <Container fluid className="project-section">
      <Container>
        <Button variant="primary" onClick={changePag}>back</Button>

        <h1 className="project-heading">Select Exercise</h1>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {es.map((ex, i) => (
            <Col md={4} className="project-card" key={i}>
              <AddEsercizioAtScheda
                idScheda={idScheda}
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

export default addEsSchedaEsistente;