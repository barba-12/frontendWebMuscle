import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Scheda as SchedaClasse } from "../../models/Scheda";
import { getAllSchede, deleteScheda } from "../../db/indexedDB";

function Giorni() {
  const navigate = useNavigate();
  const location = useLocation();
  const { schedaId } = useParams();
  const [scheda, setScheda] = useState(null);
  const [schedaClass, setSchedaClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchScheda() {
      try {
      const tutteLeSchede = await getAllSchede();
      const schedaTrovata = tutteLeSchede.find(s => s.id.toString() === schedaId);

      if (!schedaTrovata) {
        console.error("Scheda non trovata");
        return;
      }

      setScheda(schedaTrovata); // salva nello state

      // usa schedaTrovata invece di scheda
      const newScheda = new SchedaClasse({
        id: schedaTrovata.id,
        tipologia: schedaTrovata.tipologia,
        giorniAllenamento: schedaTrovata.giorniAllenamento
      });

      newScheda.setGiorni(schedaTrovata.giorni);
      newScheda.setEsercizi(schedaTrovata.esercizi);

      setSchedaClass(newScheda);

    } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      }
    }

    fetchScheda();
  }, []);

  const handleClick = (giorno) => {
    navigate(`/eserciziXGiorno/${schedaId}/${giorno}`);
  };

  const eliminaScheda = () => {
    deleteScheda(Number(schedaId));
    navigate("/schede");
  }

  const pagAddEs = () => {
    navigate(`/addEsSchedaEsistente/${schedaId}`)
  }

  if (!scheda) return <div>Caricamento scheda...</div>;

  return (
    <>
      <Link to="/schede">
        <Button variant="primary">back</Button>
      </Link>
    
      <Button variant="primary" style={{marginLeft:"20px"}} onClick={pagAddEs}>add esercizio</Button>

      {/*creare metodo per scheda che restituisce i giorni in ordine cronologico o salvarli direttamente in ordine */}
      {scheda.giorni.map((giorno, index) => (
        <Card
          key={index}
          className="project-card-view"
          style={{ margin: "30px 0px" }}
          onClick={() => handleClick(giorno)}
        >
          <Card.Body>
            <div className="card-workout-day">
              <strong>{giorno}</strong>
              <p style={{color:"#5a1e8a"}}>{schedaClass.getNumEsXGiornoDaCompletare(giorno)} esercizio da completare su {schedaClass.getNumEsXGiorno(giorno)}</p>
            </div>
          </Card.Body>
        </Card>
      ))}

      <Button onClick={() => setShowModal(true)}>elimina scheda</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="modal-header-glass">
            <Modal.Title>conferma eliminazione</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-header-glass">
          <Form.Label>Sei sicuro di voler eliminare la scheda: {scheda.tipologia}</Form.Label>
          </Modal.Body>
          <Modal.Footer className="modal-header-glass">
            <Button variant="primary" onClick={eliminaScheda}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default Giorni;