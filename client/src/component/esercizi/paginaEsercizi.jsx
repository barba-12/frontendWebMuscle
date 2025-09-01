import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, InputGroup } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link } from "react-router-dom";
import { getAllSchede, openDB } from "../../db/indexedDB";
import { getAllMuscle } from "../../db/functionExercise"

function PaginaEsercizi({ esercizi }) {
  const [es, setEs] = useState(esercizi);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allMuscle, setAllMuscle] = useState(getAllMuscle());
  const [muscleSelected, setMuscleSelected] = useState([]);

  const cercaFiltri = () => {
    setShowModal(false);
    console.log(allMuscle);
    console.log(muscleSelected);
  }

  const toggleFiltro = (filtro) => {
    setMuscleSelected((prev) =>
      prev.includes(filtro)
        ? prev.filter((f) => f !== filtro) 
        : [...prev, filtro]
    );
  };

  useEffect(() => {
    if (muscleSelected.length > 0) {
      esercizi.forEach(es => {
        console.log(es.muscoliAllenati);
      });

      const listaEsFiltrati = esercizi.filter((es) =>
        es.muscoliAllenati?.some((muscolo) => muscleSelected.includes(muscolo))
      );

      setEs(listaEsFiltrati);
    } else {
      setEs(esercizi); 
    }
  }, [muscleSelected, esercizi]);

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
            <Button variant="primary" className="mb-3" style={{marginRight:"20px"}}>
              Login
            </Button>
          </Link>

          <Button variant="primary" className="mb-3" onClick={() => {setShowModal(true)}}>
            Filtri
          </Button>

          <h1 className="project-heading">Exercise</h1>

          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {console.log(es)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-glass">
          <Modal.Title>Filtri di ricerca</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-header-glass">
            <Form.Label style={{margin:"0px"}}>Seleziona i parametri di ricerca</Form.Label>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {allMuscle.map((filtro, idx) => (
                <Button
                  key={idx}
                  className={muscleSelected.includes(filtro) ? "btnSelected" : "btnOnSelect"}
                  onClick={() => toggleFiltro(filtro)}
                >
                  {filtro}
                </Button>
              ))}
            </div>
          <Form.Label style={{marginTop:"20px"}}>Sono stati trovati {es.length} esercizi</Form.Label>
        </Modal.Body>
        <Modal.Footer className="modal-header-glass">
          <Button variant="primary" onClick={cercaFiltri}>
            Applica
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaginaEsercizi;