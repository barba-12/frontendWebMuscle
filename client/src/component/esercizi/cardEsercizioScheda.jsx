import React, { useState, useEffect } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link, useNavigate } from "react-router-dom";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import exerciseData from "../../data/exercise";
import { getAllSchedeDB, saveScheda } from "../../db/DBschede";
import { getEsercizioBase, saveEsercizioBase } from "../../db/DBdatiEsercizi";
import { Scheda } from "../../models/Scheda";
import { EsercizioDoppione } from "../../models/EsercizioDoppione";

function cardEsercizioScheda({ schedaId, esercizioId, activeVideoId, setActiveVideoId }) {
  const [esercizioRaw, setEsercizioRaw] = useState(null);
  const [esercizio, setEsercizio] = useState(null);
  const [serie, setSerie] = useState("");
  const [ripetizioni, setRipetizioni] = useState("");
  const [carico, setCarico] = useState("");
  const [tempoRecupero, setTempoRecupero] = useState("");
  const [giorno, setGiorno] = useState("");
  const [comment, setComment] = useState("");
  const [scheda, setScheda] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [esercizioDati, setEsercizioDati] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const giorni = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];

  // Recupero scheda
  useEffect(() => {
    async function fetchScheda() {
      try {
        const tutteLeSchede = await getAllSchedeDB();
        const schedaTrovata = tutteLeSchede.find(s => s.id.toString() === schedaId);
        setScheda(schedaTrovata || null);
      } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      }
    }

    fetchScheda();
  }, [schedaId]);

  useEffect(() => {
    if (scheda) {
      const ex = scheda.esercizi.find(e => e.idUnivoco === esercizioId);

      if (!ex) return;

      const fetchEsercizio = async () => {
        const exDati = await getEsercizioBase(ex.idEsercizio);

        setEsercizio(ex || null);

        const es = new EsercizioScheda(
          ex.idEsercizio,
          exDati.ripetizioni,
          exDati.serie,
          exDati.tempoRecupero,
          exDati.carico
        );

        setEsercizioDati(es);

        if (exDati) {
          setSerie(exDati.serie?.[0]?.toString() || "");
          setRipetizioni(exDati.ripetizioni?.[0]?.toString() || "");
          setCarico(exDati.carico?.[0]?.toString() || "");
          setTempoRecupero(exDati.tempoRecupero?.[0]?.toString() || "");
        }

        setGiorno(ex.giorno || "");
        setEsercizioRaw(exerciseData.find(es => es.id === ex.idEsercizio) || null);
      };

      fetchEsercizio();
    }
  }, [scheda, esercizioId]);

  //cercare esercizio in exercisedata da idEsercizio cosi da trovare l'es raw
  const handleSave = (e) => {
    e.preventDefault();
    const result = checkError();
    if (result.ok){

      //modificare giorno anche per esercizio singolo
      const nuovaScheda = new Scheda({
        id: scheda.id,
        tipologia: scheda.tipologia,
        giorniAllenamento: scheda.giorni.length,
      });
      nuovaScheda.setGiorni(scheda.giorni);

      scheda.esercizi.forEach(e => {
        nuovaScheda.addEsercizio(new EsercizioDoppione(
          e.idUnivoco,
          e.idEsercizio,
          e.giorno,
          e.completato,
          e.comment
        ));
      });

      nuovaScheda.changeGiorno(esercizio.idUnivoco, giorno);

      let esercizioClone = nuovaScheda.getEsByIdUnivoco(esercizio.idUnivoco);
      esercizioClone.setComment(comment);

      saveScheda(nuovaScheda);

      esercizioDati.modifica(Number(serie), Number(ripetizioni), Number(carico), Number(tempoRecupero));

      saveEsercizioBase(esercizioDati);
      navigate(`/giorni/${schedaId}`);
    } else {
      setShowMessage(true);
      setMessage(result.message);
    }
  }

  const checkError = () => {
    if(serie == "") return {ok : false, message: "Inserire il numero di serie"};
    if(ripetizioni == "") return {ok : false, message: "Inserire il numero di ripetizioni"};
    if(carico == "") return {ok : false, message: "Inserire il carico"};
    if(tempoRecupero == "") return {ok : false, message: "Inserire il tempo di recupero"};

    if(Number(serie) < 1) return {ok : false, message: "Inserire almeno una serie"};
    if(Number(ripetizioni) < 1) return {ok : false, message: "Inserire almeno una ripetizione"};
    if(Number(carico) < 0) return {ok : false, message: "Inserire un carico positivo"};
    if(Number(tempoRecupero) < 0) return {ok : false, message: "Inserire un tempo di recupero positivo"};
    
    // Se tutti i controlli passano
    return { ok: true, message: "Dati validi" };
  }

  if (!esercizioRaw) {
    return <h1>Caricamento...</h1>;
  }
    
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
            <strong className="purple">Muscoli allenati:</strong> {esercizioRaw.muscoliAllenati.join(" - ")}
          </Card.Text>
          <Card.Text>
            <strong className="purple">Attrezzatura:</strong> {esercizioRaw.attrezzatura.join(" - ")}
          </Card.Text>
          <Card.Text>
            <strong className="purple">Difficoltà:</strong> {esercizioRaw.difficoltà}
          </Card.Text>

          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",       // permette ai pulsanti di andare a capo su schermi piccoli
            gap: "8px",             // distanza uniforme tra pulsanti
            justifyContent: "center"  // allinea i pulsanti a sinistra, puoi cambiare in "center"
          }}>
            <Link to={`/dettaglioEsScheda/${esercizioId}/${schedaId}`}>
              <Button variant="primary">
                visualizza dettagli
              </Button>
            </Link>

            <Button variant="primary" onClick={() => setShowModal(true)}>
              Modifica
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="modal-header-glass">
            <Modal.Title>Modifica esercizio</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-header-glass">
            <Form>
              <Form.Label style={{marginRight:"20px"}}>Sposta Esercizio: </Form.Label>
                <select value={giorno} onChange={(e) => setGiorno(e.target.value)} className="select-viola-modal">
                  {giorni.map((g) => (
                    <option key={g} value={g}> {g} </option>
                  ))}
                </select>
              <Form.Group>

                {/* SERIE ESERCIZIO */}
                <Form.Label>Numero Serie</Form.Label>
                <Form.Control type="number" value={serie} onChange={(e) => setSerie(e.target.value)} className="form-control input-custom"/>

                {/* RIPETIZIONI ESERCIZIO */}
                <Form.Label>Numero Ripetizioni</Form.Label>
                <Form.Control type="number" value={ripetizioni} onChange={(e) => setRipetizioni(e.target.value)} className="form-control input-custom"/>

                {/* CARICO ESERCIZIO */}
                <Form.Label>Carico</Form.Label>
                <Form.Control type="number" value={carico} onChange={(e) => setCarico(e.target.value)} className="form-control input-custom"/>

                {/* TEMPO DI RECUPERO ESERCIZIO */}
                <Form.Label>Tempo Di Recupero</Form.Label>
                <Form.Control type="number" value={tempoRecupero} onChange={(e) => setTempoRecupero(e.target.value)} className="form-control input-custom"/>

                {/* COMMENTO */}
                <textarea style={{marginTop:"20px"}} placeholder="Commenti" className="form-control input-viola" aria-label="With textarea" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

                {showMessage && (
                  <div className="alert alert-warning alert-warning-login" role="alert">
                    {message}
                  </div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-header-glass">
            <Button variant="primary" onClick={handleSave}>
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default cardEsercizioScheda;