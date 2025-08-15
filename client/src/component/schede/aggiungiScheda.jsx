import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

function AggiungiScheda() {
    const[nomeScheda, setNomeScheda] = useState("");
    const navigate = useNavigate();
  
  return (
    <>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={12} className="schede-card">
            <Card className="project-card-view">
                <Card.Body>
                    <Button variant="primary" onClick={() => navigate(-1)}>Schede</Button>

                    <Form>
                        <Form.Group className="mb-5">
                            <Form.Control 
                                type="text"
                                placeholder="nome scheda" 
                                className="input-viola"
                                value={nomeScheda}
                                onChange={(e) => setNomeScheda(e.target.value)}
                            />
                        </Form.Group>

                    <Form.Text>seleziona giorni di allenamento</Form.Text>
                    <Form.Group className="mb-5">
                        {["lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica"].map((giorno, index) => (
                            <React.Fragment key={giorno}>
                            <input
                                type="checkbox"
                                className="btn-check"
                                id={`btn-check-${index}`}
                                autoComplete="off"
                            />
                            <label 
                                className="btn btn-viola" 
                                htmlFor={`btn-check-${index}`}
                            >
                                {giorno}
                            </label>
                            </React.Fragment>
                        ))}
                    </Form.Group>

                        <Button variant="primary" onClick={() => navigate("/pagSelezionaEs")}>scegli esercizi</Button>

                        <Button type="submit">
                            Invia
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
          </Col>
        </Row>
    </>
  );
}

export default AggiungiScheda;
