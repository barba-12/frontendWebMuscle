import React, { useState, useEffect, use } from "react";
import { Row, Col, Button, Card, Form, Modal } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link, useNavigate } from "react-router-dom";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import exerciseData from "../../data/exercise";
import { getAllSchede, saveScheda } from "../../db/indexedDB";
import { Scheda } from "../../models/Scheda";

function cardEsercizioScheda({ schedaId, esercizio, activeVideoId, setActiveVideoId }) {
  const [esercizioRaw, setEsercizioRaw] = useState(exerciseData.find(es => es.id == esercizio.idEsercizio));
  const [showModal, setShowModal] = useState(false);
  const [serie, setSerie] = useState(esercizio.serie);
  const [ripetizioni, setRipetizioni] = useState(esercizio.ripetizioni[0]);
  const [carico, setCarico] = useState(esercizio.carico[0]);
  const [tempoRecupero, setTempoRecupero] = useState(esercizio.tempoRecupero[0]);
  const [giorno, setGiorno] = useState(esercizio.giorno);
  const [scheda, setScheda] = useState(null);
  const giorni = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchScheda() {
      try {
        const tutteLeSchede = await getAllSchede(); // recupera tutte le schede
        const schedaTrovata = tutteLeSchede.find(s => s.id.toString() === schedaId);
        setScheda(schedaTrovata || null); // salva la scheda trovata o null
      } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      }
    }

    fetchScheda();
  }, [schedaId]);

  //cercare esercizio in exercisedata da idEsercizio cosi da trovare l'es row
  const handleSave = () => {
    //creo instanza classe, modifico esercizio e salva in indexedDB

    const nuovaScheda = new Scheda({
      id: scheda.id,
      tipologia: scheda.tipologia,
      giorniAllenamento: scheda.giorni.length,
    });

    nuovaScheda.setGiorni(scheda.giorni);

    scheda.esercizi.forEach(e => {
      const newEs = new EsercizioScheda(
        e.idUnivoco,
        e.idEsercizio,
        e.giorno,
        e.ripetizioni,
        e.serie,
        e.tempoRecupero,
        e.carico,
        e.completato
      );

      nuovaScheda.addEsercizio(newEs);
    });

    nuovaScheda.modificaEsercizio(esercizio.idUnivoco, serie, ripetizioni, carico, tempoRecupero, giorno);
    saveScheda(nuovaScheda);
    navigate(`/giorni/${schedaId}`);
    console.log("modificato");
  }
    
   //AGGIUNGERE CONTROLLI NON HTML5
  return (
    <>
      <Card className="project-card-view">
        {esercizioRaw.immaginiVideo && esercizioRaw.immaginiVideo.length > 0 && (
          <VideoPlayer
            videos={esercizioRaw.immaginiVideo}
            esercizioId={esercizioRaw.id}
            activeVideoId={activeVideoId}
            setActiveVideoId={setActiveVideoId}
          />
        )}

        <Card.Body>
          <Card.Title>{esercizioRaw.nome}</Card.Title>

          <Card.Text>
            <strong className="purple">Muscoli allenati:</strong> {esercizioRaw.muscoliAllenati}
          </Card.Text>
          <Card.Text>
            <strong className="purple">Attrezzatura:</strong> {esercizioRaw.attrezzatura}
          </Card.Text>
          <Card.Text>
            <strong className="purple">Difficoltà:</strong> {esercizioRaw.difficoltà}
          </Card.Text>

          <Link to={`/dettaglioEsScheda/${esercizio.idUnivoco}/${schedaId}`}>
            <Button variant="primary">
              visualizza dettagli
            </Button>
          </Link>

          <Button variant="primary" onClick={() => setShowModal(true)} style={{marginTop:"20px"}}>
            Modifica
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modifica esercizio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Sposta Esercizio: </Form.Label>
                <select value={giorno} onChange={(e) => setGiorno(e.target.value)} className="select-viola">
                  {giorni.map((g) => (
                    <option key={g} value={g}> {g} </option>
                  ))}
                </select>
              <Form.Group>

                {/* SERIE ESERCIZIO */}
                <Form.Label>Numero Serie</Form.Label>
                <Form.Control type="number" value={serie} onChange={(e) => setSerie(e.target.value)} />

                {/* RIPETIZIONI ESERCIZIO */}
                <Form.Label>Numero Ripetizioni</Form.Label>
                <Form.Control type="text" value={ripetizioni} onChange={(e) => setRipetizioni(e.target.value)} />

                {/* CARICO ESERCIZIO */}
                <Form.Label>Carico</Form.Label>
                <Form.Control type="text" value={carico} onChange={(e) => setCarico(e.target.value)} />

                {/* TEMPO DI RECUPERO ESERCIZIO */}
                <Form.Label>Tempo Di Recupero</Form.Label>
                <Form.Control type="text" value={tempoRecupero} onChange={(e) => setTempoRecupero(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="success" onClick={handleSave}>
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default cardEsercizioScheda;