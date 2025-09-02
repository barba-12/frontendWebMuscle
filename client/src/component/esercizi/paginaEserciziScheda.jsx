import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Scheda } from "../../models/Scheda";
import { EsercizioDoppione } from "../../models/EsercizioDoppione";
import { getAllSchedeDB } from "../../db/DBschede";
import CardEsercizioScheda from "./cardEsercizioScheda";
import exerciseData from "../../data/exercise";
import { getAllMuscle } from "../../db/functionExercise";

function PaginaEserciziScheda() {
  const location = useLocation();
  const { schedaId, giorno } = useParams();
  const [es, setEs] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [scheda, setScheda] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [allMuscle, setAllMuscle] = useState(getAllMuscle());
  const [muscleSelected, setMuscleSelected] = useState(() => {
    const saved = sessionStorage.getItem("filtriSchedaMuscoli");
    return saved ? JSON.parse(saved) : [];
  });

  const [typeSelected, setTypeSelected] = useState(() => {
    const saved = sessionStorage.getItem("filtriSchedaTipo");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  // 🔹 Recupero scheda dal DB
  useEffect(() => {
    async function fetchScheda() {
      try {
        const tutteLeSchede = await getAllSchedeDB();
        const schedaTrovata = tutteLeSchede.find((s) => s.id.toString() === schedaId);
        setScheda(schedaTrovata || null);
      } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      }
    }

    fetchScheda();
  }, [schedaId]);

  // 🔹 Costruisco esercizi con dettagli di exerciseData
  useEffect(() => {
    if (!scheda) return;

    const nuovaScheda = new Scheda({
      id: scheda.id,
      tipologia: scheda.tipologia,
      giorniAllenamento: scheda.giorni.length,
    });

    nuovaScheda.setGiorni(scheda.giorni);

    scheda.esercizi.forEach((e) => {
      const newEs = new EsercizioDoppione(
        e.idUnivoco,
        e.idEsercizio,
        e.giorno,
        e.completato
      );
      nuovaScheda.addEsercizio(newEs);
    });

    const eserciziScheda = nuovaScheda.getEsXGiornoENonCompletato(giorno);

    // 🔹 Arricchisco con dettagli da exerciseData
    const eserciziConDettagli = eserciziScheda.map((es) => {
      const dettagli = exerciseData.find((d) => d.id === es.idEsercizio);
      return {
        ...es,
        ...dettagli,
      };
    });

    setEs(eserciziConDettagli);
  }, [scheda, location, giorno]);

  // 🔹 Salvataggio filtri in sessionStorage
  useEffect(() => {
    sessionStorage.setItem("filtriSchedaMuscoli", JSON.stringify(muscleSelected));
    sessionStorage.setItem("filtriSchedaTipo", JSON.stringify(typeSelected));
  }, [muscleSelected, typeSelected]);

  // 🔹 Gestione filtri
  const toggleFiltroMuscolo = (filtro) => {
    setMuscleSelected((prev) =>
      prev.includes(filtro) ? prev.filter((f) => f !== filtro) : [...prev, filtro]
    );
  };

  const toggleFiltroTipo = (filtro) => {
    setTypeSelected((prev) =>
      prev.includes(filtro) ? prev.filter((f) => f !== filtro) : [...prev, filtro]
    );
  };

  const resetFiltri = () => {
    setMuscleSelected([]);
    setTypeSelected([]);
  };

  const applicaFiltri = () => {
    setShowModal(false);
  };

  // 🔹 Applico filtri a `es`
  let eserciziFiltrati = [...es];

  if (muscleSelected.length > 0) {
    eserciziFiltrati = eserciziFiltrati.filter((ex) =>
      ex.muscoliAllenati?.some((m) => muscleSelected.includes(m))
    );
  }

  if (typeSelected.length > 0) {
    eserciziFiltrati = eserciziFiltrati.filter((ex) => {
      return (
        (typeSelected.includes("Corpo Libero") &&
          ex.attrezzatura?.[0] === "Nessuna attrezzatura richiesta") ||
        (typeSelected.includes("Attrezzatura") &&
          ex.attrezzatura?.[0] !== "Nessuna attrezzatura richiesta") ||
        (typeSelected.includes("Allungamento") && ex.isStreching)
      );
    });
  }

  function handleClick() {
    navigate(`/giorni/${schedaId}`);
  }

  return (
    <Container fluid className="project-section">
      <Container>
        <Button variant="primary" onClick={handleClick} style={{ marginRight: "20px" }}>
          Back
        </Button>

        <Button variant="primary" onClick={() => setShowModal(true)}>
          Filtri
        </Button>

        <h1 className="project-heading">Exercise</h1>

        {(muscleSelected.length > 0 || typeSelected.length > 0) && (
          <p className="project-text">
            Filtri applicati: {[...muscleSelected, ...typeSelected].join(", ")}
          </p>
        )}

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {eserciziFiltrati.map((ex, i) => (
            <Col md={4} className="project-card desktop-margin-right" key={i}>
              <CardEsercizioScheda
                schedaId={schedaId}
                esercizioId={ex.idUnivoco}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal Filtri */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-glass">
          <Modal.Title>Filtri di ricerca</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-header-glass">
          <Form.Label style={{ margin: "0px" }}>Muscoli</Form.Label>
          <div className="d-flex flex-wrap gap-2 mt-3">
            {allMuscle.map((filtro, idx) => (
              <Button
                key={idx}
                className={muscleSelected.includes(filtro) ? "btnSelected" : "btnOnSelect"}
                onClick={() => toggleFiltroMuscolo(filtro)}
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
              onClick={() => toggleFiltroTipo("Corpo Libero")}
            >
              Corpo Libero
            </Button>
            <Button
              className={typeSelected.includes("Attrezzatura") ? "btnSelected" : "btnOnSelect"}
              onClick={() => toggleFiltroTipo("Attrezzatura")}
            >
              Attrezzatura
            </Button>
            <Button
              className={typeSelected.includes("Allungamento") ? "btnSelected" : "btnOnSelect"}
              onClick={() => toggleFiltroTipo("Allungamento")}
            >
              Allungamento
            </Button>
          </div>

          <Form.Label style={{ marginTop: "20px" }}>
            Sono stati trovati {eserciziFiltrati.length} esercizi
          </Form.Label>
        </Modal.Body>
        <Modal.Footer className="modal-header-glass">
          <Button variant="primary" onClick={resetFiltri}>
            Reset
          </Button>
          <Button variant="primary" onClick={applicaFiltri}>
            Applica
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PaginaEserciziScheda;