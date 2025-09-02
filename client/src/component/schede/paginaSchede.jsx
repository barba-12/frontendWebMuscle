import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Scheda from "./Scheda";
import { getAllSchedeDB } from "../../db/DBschede"; // Funzione dal servizio IndexedDB
import Card from "react-bootstrap/Card";

function PaginaSchede() {
  const [schede, setSchede] = useState([]);

  // Carica le schede dal DB quando il componente si monta
  useEffect(() => {
    getAllSchedeDB().then(rawSchede => {
      setSchede(rawSchede);
    });
  }, []);

  return (
    <Container fluid className="project-section">
      <Container>
        <Link to="/">
          <Button variant="primary">Esercizi</Button>
        </Link>

        <Row style={{ justifyContent: "center", paddingBottom: "5px" }}>
          {schede.length > 0 && (
            schede.map((scheda) => (
              <Col md={12} className="schede-card" key={scheda.id}>
                <Scheda schedaId={scheda.id} />
              </Col>
            ))
          )}
          <Col md={12} className="schede-card">
            <Link to="/aggiungiScheda" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="project-card-view">
                <Card.Body>
                  <Card.Title style={{color:"rgba(119, 53, 136)"}}>AGGIUNGI SCHEDA</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default PaginaSchede;