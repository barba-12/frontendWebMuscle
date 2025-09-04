import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link } from "react-router-dom";
import { getAllMuscle } from "../../db/functionExercise";

function PaginaEsercizi({ esercizi }) {
  const [es, setEs] = useState(esercizi);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allMuscle, setAllMuscle] = useState(getAllMuscle());
  const [nome, setNome] = useState("");

  // recupero filtri da sessionStorage
  const [muscleSelected, setMuscleSelected] = useState(() => {
    const saved = sessionStorage.getItem("filtriEsercizi");
    return saved ? JSON.parse(saved) : [];
  });

  const [typeSelected, setTypeSelected] = useState(() => {
    const saved = sessionStorage.getItem("filtriEsercizi2");
    return saved ? JSON.parse(saved) : [];
  });

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

  const cercaFiltri = () => {
    setShowModal(false);
  };

  // applico filtri
  useEffect(() => {
    let listaEs = [...esercizi];

    if (muscleSelected.length > 0) {
      listaEs = listaEs.filter((es) =>
        es.muscoliAllenati?.some((muscolo) => muscleSelected.includes(muscolo))
      );
    }

    if (typeSelected.length > 0) {
      listaEs = listaEs.filter((es) => {
        const corpoLiberoMatch =
          typeSelected.includes("Corpo Libero") &&
          es.attrezzatura?.[0] === "Nessuna attrezzatura richiesta";

        const attrezzaturaMatch =
          typeSelected.includes("Attrezzatura") &&
          es.attrezzatura?.[0] !== "Nessuna attrezzatura richiesta";

        const allungamentoMatch =
          typeSelected.includes("Allungamento") && es.isStreching;

        return corpoLiberoMatch || attrezzaturaMatch || allungamentoMatch;
      });
    }

    if(nome != ""){
      listaEs = listaEs.filter((es) => 
        es.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    setEs(listaEs);
  }, [muscleSelected, typeSelected, esercizi, nome]);

  // salvo i filtri
  useEffect(() => {
    sessionStorage.setItem("filtriEsercizi", JSON.stringify(muscleSelected));
    sessionStorage.setItem("filtriEsercizi2", JSON.stringify(typeSelected));
  }, [muscleSelected, typeSelected]);

  return (
    <>
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
            {es.map((ex, i) => (
              <Col md={4} className="project-card desktop-margin-right" key={i}>
                <Esercizio
                  esercizio={ex}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-glass">
          <Modal.Title>Filtri di ricerca</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-header-glass">
          {/* 🔹 Filtro per nome */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control input-custom"
              aria-describedby="emailHelp"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <hr />

          {/* 🔹 Filtro muscoli */}
          <Form.Label style={{ margin: "0px" }}>Muscoli</Form.Label>
          <div className="d-flex flex-wrap gap-2 mt-3">
            {allMuscle.map((filtro, idx) => (
              <Button
                key={idx}
                className={muscleSelected.includes(filtro) ? "btnSelected" : "btnOnSelect"}
                onClick={() => toggleMuscleFiltro(filtro)} // ✅ corretto
              >
                {filtro}
              </Button>
            ))}
          </div>

          <hr />

          {/* 🔹 Filtro tipologia */}
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

          {/* 🔹 Conteggio risultati */}
          <Form.Label style={{ marginTop: "20px" }}>
            Sono stati trovati {es.length} esercizi
          </Form.Label>
        </Modal.Body>

        <Modal.Footer className="modal-header-glass">
          <Button variant="primary" onClick={resetFiltri}>
            Reset
          </Button>
          <Button variant="primary" onClick={cercaFiltri}>
            Applica
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default PaginaEsercizi;