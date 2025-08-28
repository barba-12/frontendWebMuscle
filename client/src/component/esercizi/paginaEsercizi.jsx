import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link } from "react-router-dom";
import { getAllSchede, openDB } from "../../db/indexedDB";

function PaginaEsercizi({ esercizi }) {
  const [es, setEs] = useState(esercizi);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pass, setPass] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const STORE_NAME = "schede";

const scaricaJSON = async () => {
  if(pass == "Amministratore12"){
    // 🔹 Ottieni le schede già merge-ate (DB + JSON)
    const schedeDB = await getAllSchede();

    // 🔹 Preparo solo i dati numerici da esportare
    const schedeExport = schedeDB.map((scheda) => ({
      id: scheda.id,
      esercizi: scheda.esercizi.map((ex) => ({
        idUnivoco: ex.idUnivoco,
        ripetizioni: ex.ripetizioni || [],
        carico: ex.carico || [],
        tempoRecupero: ex.tempoRecupero || [],
      })),
    }));

    // 🔹 Download JSON
    const jsonString = JSON.stringify(schedeExport, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "schede.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // 🔹 Resetto i campi numerici in IndexedDB
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    for (const scheda of schedeDB) {
      scheda.esercizi = scheda.esercizi.map((ex) => ({
        ...ex,
        ripetizioni: [],
        carico: [],
        tempoRecupero: [],
      }));
      store.put(scheda);
    }

    await tx.done;

    setShowModal(false);
    setPass("");
    setShowMessage(false);
  } else setShowMessage(true);
};


  return (
    <>
      <Container fluid className="project-section">
        <Container>
          <Link to="/schede">
            <Button variant="primary">Schede</Button>
          </Link>

          <Button variant="primary" style={{marginLeft:"30px"}} onClick={() => setShowModal(true)}>Scarica JSON</Button>

          <h1 className="project-heading">Exercise</h1>

          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {es.map((ex, i) => {
              return (
                <Col md={4} className="project-card" key={i}>
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
        <Modal.Header closeButton>
          <Modal.Title>Scaricaggio JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Label>Immetendo la password amministratore, eliminerai PERMANENTEMENTE i dati salvati in indexedDB, successivamente verrà scaricato un file json che protrà essere inserito manualmente nei file del sito.</Form.Label>
              {/* PASSWORD AMM */}
              <Form.Label>Password Amministratore</Form.Label>
              <Form.Control type="password" value={pass} onChange={(e) => setPass(e.target.value)} />

              {showMessage && <h1>Password Errata</h1>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="success" onClick={scaricaJSON}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaginaEsercizi;