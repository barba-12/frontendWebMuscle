import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link } from "react-router-dom";
import { getAllSchede, openDB } from "../../db/indexedDB";

function PaginaEsercizi({ esercizi }) {
  const [es, setEs] = useState(esercizi);
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <>
      <Container fluid className="project-section">
        <Container>
          <Link to="/schede">
            <Button variant="primary" className="mb-3" style={{marginRight:"20px"}}>
              Schede
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" className="mb-3">
              Login
            </Button>
          </Link>

          <h1 className="project-heading">Exercise</h1>

          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {es.map((ex, i) => {
              return (
                <Col md={4} className="project-card desktop-margin-right" key={i}>
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
    </>
  );
}

export default PaginaEsercizi;