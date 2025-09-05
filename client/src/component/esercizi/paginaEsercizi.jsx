import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link } from "react-router-dom";
import { getAllMuscle } from "../../db/functionExercise";
import { saveEsercizi, getEsercizi, saveFiltri, getFiltri } from "../../db/db";

function PaginaEsercizi({ esercizi }) {
  const [es, setEs] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allMuscle, setAllMuscle] = useState([]);
  const [nome, setNome] = useState("");
  const [muscleSelected, setMuscleSelected] = useState([]);
  const [typeSelected, setTypeSelected] = useState([]);

  // 🔹 Caricamento iniziale da IndexedDB
  useEffect(() => {
    async function loadData() {
      const savedEsercizi = await getEsercizi();
      if (savedEsercizi) {
        setEs(savedEsercizi);
      } else {
        setEs(esercizi);
        await saveEsercizi(esercizi);
      }

      setAllMuscle(getAllMuscle());

      const savedFiltri = await getFiltri();
      setMuscleSelected(savedFiltri.muscle || []);
      setTypeSelected(savedFiltri.type || []);
    }
    loadData();
  }, [esercizi]);

  // 🔹 Salvataggio filtri
  useEffect(() => {
    saveFiltri({ muscle: muscleSelected, type: typeSelected });
  }, [muscleSelected, typeSelected]);

  const toggleMuscleFiltro = (filtro) => {
    setMuscleSelected((prev) =>
      prev.includes(filtro) ? prev.filter((f) => f !== filtro) : [...prev, filtro]
    );
  };

  const toggleTypeFiltro = (filtro) => {
    setTypeSelected((prev) =>
      prev.includes(filtro) ? prev.filter((f) => f !== filtro) : [...prev, filtro]
    );
  };

  const resetFiltri = () => {
    setMuscleSelected([]);
    setTypeSelected([]);
    setNome("");
  };

  // 🔹 Filtraggio ottimizzato con useMemo
  const filteredEsercizi = useMemo(() => {
    let lista = [...es];

    if (muscleSelected.length > 0) {
      lista = lista.filter((ex) =>
        ex.muscoliAllenati?.some((m) => muscleSelected.includes(m))
      );
    }

    if (typeSelected.length > 0) {
      lista = lista.filter((ex) => {
        const corpoLiberoMatch =
          typeSelected.includes("Corpo Libero") &&
          ex.attrezzatura?.[0] === "Nessuna attrezzatura richiesta";

        const attrezzaturaMatch =
          typeSelected.includes("Attrezzatura") &&
          ex.attrezzatura?.[0] !== "Nessuna attrezzatura richiesta";

        const allungamentoMatch =
          typeSelected.includes("Allungamento") && ex.isStreching;

        return corpoLiberoMatch || attrezzaturaMatch || allungamentoMatch;
      });
    }

    if (nome !== "") {
      lista = lista.filter((ex) =>
        ex.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    return lista;
  }, [es, muscleSelected, typeSelected, nome]);

  return (
    <Container fluid className="project-section">
      <Container>
        <Link to="/schede">
          <Button variant="primary" className="mb-3" style={{ marginRight: "20px" }}>
            Schede
          </Button>
        </Link>
        <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
          Filtri
        </Button>

        <h1 className="project-heading">Exercise</h1>

        {(muscleSelected.length > 0 || typeSelected.length > 0) && (
          <p className="project-text">
            Filtri applicati: {[...typeSelected, ...muscleSelected].join(", ")}
          </p>
        )}

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {filteredEsercizi.map((ex, i) => (
            <Col md={4} className="project-card desktop-margin-right" key={i}>
              <Esercizio
                esercizio={ex}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
              />
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="modal-header-glass">
            <Modal.Title>Filtri di ricerca</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-header-glass">
            <div className="mb-3">
              <input
                type="text"
                className="form-control input-custom"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <hr />
            <Form.Label style={{ margin: "0px" }}>Muscoli</Form.Label>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {allMuscle.map((filtro, idx) => (
                <Button
                  key={idx}
                  className={muscleSelected.includes(filtro) ? "btnSelected" : "btnOnSelect"}
                  onClick={() => toggleMuscleFiltro(filtro)}
                >
                  {filtro}
                </Button>
              ))}
            </div>
            <hr />
            <Form.Label style={{ margin: "0px" }}>Tipologia</Form.Label>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <Button
                className={typeSelected.includes("Corpo Libero") ? "btnSelected" : "btnOnSelect"}
                onClick={() => toggleTypeFiltro("Corpo Libero")}
              >
                Corpo Libero
              </Button>
              <Button
                className={typeSelected.includes("Attrezzatura") ? "btnSelected" : "btnOnSelect"}
                onClick={() => toggleTypeFiltro("Attrezzatura")}
              >
                Attrezzatura
              </Button>
              <Button
                className={typeSelected.includes("Allungamento") ? "btnSelected" : "btnOnSelect"}
                onClick={() => toggleTypeFiltro("Allungamento")}
              >
                Allungamento
              </Button>
            </div>
            <Form.Label style={{ marginTop: "20px" }}>
              Sono stati trovati {filteredEsercizi.length} esercizi
            </Form.Label>
          </Modal.Body>
          <Modal.Footer className="modal-header-glass">
            <Button variant="primary" onClick={resetFiltri}>
              Reset
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Applica
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default PaginaEsercizi;
