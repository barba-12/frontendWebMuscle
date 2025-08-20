import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, CardBody } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Scheda from "./Scheda"; // Assumo sia il componente che mostra una singola scheda
import { Scheda as SchedaModel } from "../../models/Scheda";
import { getAllSchede } from "../../db/indexedDB"; // Funzione dal servizio IndexedDB
import Card from "react-bootstrap/Card";

function PaginaSchede() {
  const [schede, setSchede] = useState([]);
  const navigate = useNavigate();

  // Carica le schede dal DB quando il componente si monta
  useEffect(() => {
    getAllSchede().then(rawSchede => {
      setSchede(rawSchede);
    });
  }, []);

  return (
    <Container fluid className="project-section">
      <Container>
        <Link to="/">
          <Button variant="primary">Esercizi</Button>
        </Link>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {schede.length > 0 && (
            schede.map((scheda) => (
              <Col md={12} className="schede-card" key={scheda.id}>
                <Scheda scheda={scheda} />
              </Col>
            ))
          )}
          <Col md={12} className="schede-card">
            <Link to="/aggiungiScheda" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="project-card-view">
                <Card.Body>
                  <Card.Title style={{color:"green"}}>AGGIUNGI SCHEDA</Card.Title>
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