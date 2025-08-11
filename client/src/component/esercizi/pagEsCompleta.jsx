import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function pagEsCompleta() {
    const navigate = useNavigate();
    const location = useLocation();
    const { esercizio } = location.state || {};

  return (
    <Card className="project-card-view">
        <Button variant="primary" onClick={() => navigate(-1)}>back</Button>

        <Card.Body>
            <h1>{esercizio.nome}</h1>
        </Card.Body>
    </Card>
  );
}

export default pagEsCompleta;