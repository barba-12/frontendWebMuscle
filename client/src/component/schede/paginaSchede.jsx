import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Scheda from "./scheda";
import schede from "../../data/gymSheet";

// aggiungere container con un + per aggiugnere una scheda che apre una pagina dove sara possbili inserire tutti i dati necessari per salvare una scheda
//nome, giorni di allenamento (lun, mar, mer), esercizi per ogni giorno, ripetizioni-serie-peso-tempi di recupero generici da mantenere
//salvare il tutto su indexedDB 

function PaginaSchede() {
  return (
    <Container fluid className="project-section">
      <Container>
        <Link to="/">
          <Button variant="primary">esercizi</Button>
        </Link>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {schede.map((scheda) => (
            <Col md={12} className="schede-card" key={scheda.id}>
                <Scheda scheda={scheda} />
            </Col>
            ))}
        </Row>
      </Container>
    </Container>
  );
}

export default PaginaSchede;