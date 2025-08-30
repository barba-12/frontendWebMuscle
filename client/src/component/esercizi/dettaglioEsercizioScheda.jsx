import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Card, Modal, Form  } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { saveScheda } from "../../db/indexedDB";
import exerciseData from "../../data/exercise";
import { getAllSchedeDB, getAllSchede } from "../../db/indexedDB";
import Grafico from "../grafico/grafico";

function dettaglioEsercizioScheda() {
  const navigate = useNavigate();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { esercizioId, schedaId } = useParams();
  const [esercizioRaw, setEsercizioRaw] = useState();
  const [esercizio, setEsercizio] = useState();
  const [ripetizioni, setRipetizioni] = useState([]);
  const [carico, setCarico] = useState([]);
  const [tempoRecupero, setTempoRecupero] = useState([]);
  const [scheda, setScheda] = useState();
  const [schedaDB, setSchedaDB] = useState();
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchScheda() {
      try {
        const tutteLeSchede = await getAllSchede();
        const schedaTrovata = tutteLeSchede.find(s => s.id.toString() === schedaId);

        const nuovaScheda = new Scheda({
          id: schedaTrovata.id,
          tipologia: schedaTrovata.tipologia,
          giorniAllenamento: schedaTrovata.giorni.length,
        });
        nuovaScheda.setGiorni(schedaTrovata.giorni);

        schedaTrovata.esercizi.forEach(e => {
          nuovaScheda.addEsercizio(new EsercizioScheda(
            e.idUnivoco,
            e.idEsercizio?.idEsercizio || e.idEsercizio,
            e.giorno,
            e.ripetizioni,
            e.serie,
            e.tempoRecupero,
            e.carico,
            e.completato
          ));
        });

        // 🔹 qui la scheda è pronta
        setScheda(nuovaScheda);

        const esercizioTrovato = nuovaScheda.getEsByIdUnivoco(esercizioId);
        setEsercizio(esercizioTrovato);
        setEsercizioRaw(
          exerciseData.find(es => es.id == esercizioTrovato.idEsercizio)
        );

      } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScheda();
  }, [schedaId, esercizioId]);

  useEffect(() => {
    async function fetchScheda() {
      try {
        const tutteLeSchede = await getAllSchedeDB();
        const schedaTrovata = tutteLeSchede.find(s => s.id.toString() === schedaId);

        const nuovaScheda = new Scheda({
          id: schedaTrovata.id,
          tipologia: schedaTrovata.tipologia,
          giorniAllenamento: schedaTrovata.giorni.length,
        });
        nuovaScheda.setGiorni(schedaTrovata.giorni);

        schedaTrovata.esercizi.forEach(e => {
          nuovaScheda.addEsercizio(new EsercizioScheda(
            e.idUnivoco,
            e.idEsercizio?.idEsercizio || e.idEsercizio,
            e.giorno,
            e.ripetizioni,
            e.serie,
            e.tempoRecupero,
            e.carico,
            e.completato
          ));
        });

        // 🔹 qui la scheda è pronta
        setSchedaDB(nuovaScheda);

      } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScheda();
  }, [schedaId, esercizioId]);

  useEffect(() => {
    if (!esercizio) return;
    const count = Number(esercizio.serie) || 0;

    setRipetizioni(prev => {
      if (prev.length === count) return prev;
      return Array.from({ length: count }, (_, i) => prev[i] ?? "");
    });

    setCarico(prev => {
      if (prev.length === count) return prev;
      return Array.from({ length: count }, (_, i) => prev[i] ?? "");
    });

    setTempoRecupero(prev => {
      if (prev.length === count) return prev;
      return Array.from({ length: count }, (_, i) => prev[i] ?? "");
    });
  }, [esercizio]);

  //quando una rep è 0 e non "" rimuovo allo stesso indice anche carico e tempo
  function checkVuoti() {
    const newRip = [];
    const newCarico = [];
    const newTempo = [];

    for (let i = 0; i < ripetizioni.length; i++) {
      if (Number(ripetizioni[i]) !== 0) {
        newRip.push(ripetizioni[i]);
        newCarico.push(carico[i]);
        newTempo.push(tempoRecupero[i]);
      }
    }

    setRipetizioni(newRip);
    setCarico(newCarico);
    setTempoRecupero(newTempo);

    return { newRip, newCarico, newTempo };
  }

  function cambiaStatoEs(e) {
    e.preventDefault();
    const result = checkError();
    if (result.ok){
       const { newRip, newCarico, newTempo } = checkVuoti();
      schedaDB.esercizi.forEach(es => {
        if (es.getIdUnivoco() === esercizio.idUnivoco) {
          es.addRipetizione(newRip.map(Number));
          es.addTempoRecupero(newTempo.map(Number));
          es.addCarico(newCarico.map(Number));
          es.setCompletato(true);
        }
      });

      saveScheda(schedaDB);
      if(schedaDB.getNumEsXGiornoAttivi(esercizio.giorno) == 0) navigate(`/giorni/${schedaId}`);
      else navigate(`/eserciziXGiorno/${schedaId}/${esercizio.giorno}`);
    }
    else {
      setShowMessage(true);
      setMessage(result.message);
    }
  }

  const checkError = () => {
    for(let i=0; i<ripetizioni.length; i++){
      if(ripetizioni[i] == "") return {ok : false, message: `Inserire ripetizioni nella ${i+1} serie` };
      if(Number(ripetizioni[i]) < 0) return {ok : false, message: `Inserire ripetizione positiva nella ${i+1} serie` };
    }

    for(let i=0; i<carico.length; i++){
      if(carico[i] == "") return {ok : false, message: `Inserire carico nella ${i+1} serie` };
      if(Number(carico[i]) < 0) return {ok : false, message: `Inserire carico positivo nella ${i+1} serie` };
    }

    for(let i=0; i<tempoRecupero.length; i++){
      if(tempoRecupero[i] == "") return {ok : false, message: `Inserire tempo di recupero nella ${i+1} serie` };
      if(Number(tempoRecupero[i]) < 0) return {ok : false, message: `Inserire tempo di recupero positivo nella ${i+1} serie` };
    }

    // Se tutti i controlli passano
    return { ok: true, message: "Dati validi" };
  }

  const elimina = () => {
    scheda.eliminaEsercizio(esercizio.idUnivoco);
    saveScheda(scheda);
    if(scheda.getNumEsXGiorno(esercizio.giorno) == 0) navigate(`/giorni/${schedaId}`);
    else navigate(`/eserciziXGiorno/${schedaId}/${esercizio.giorno}`);
  }

  if (loading || !esercizioRaw) {
      return (
      <div className="d-flex justify-content-center align-items-center vh-100">
          <span className="visually-hidden">Caricamento...</span>
      </div>
      );
  }

  return (
    <>
    <Card className="project-card-view">
      <Button variant="primary" onClick={() => navigate(`/eserciziXGiorno/${schedaId}/${esercizio.giorno}`)}>back</Button>
      <Card.Body>
        {esercizioRaw.immaginiVideo && esercizioRaw.immaginiVideo.length > 0 && (
          <VideoPlayer
            videos={esercizioRaw.immaginiVideo}
            esercizioRawId={esercizioRaw.id}
            activeVideoId={activeVideoId}
            setActiveVideoId={setActiveVideoId}
          />
        )}

        <h1>{esercizioRaw.nome}</h1>

        <div style={{textAlign:"left"}}>
          <h5>Dati esercizio:</h5>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <p style={{ margin: 0}}>Ripetizioni: {esercizio.ripetizioni[0]}</p>
            <p style={{ margin: 0, textAlign: "center", flex: 1 }}>Carico: {esercizio.carico[0]}</p>
            <p style={{ margin: 0, textAlign: "right" }}>Recupero: {esercizio.tempoRecupero[0]}</p>
          </div>
          <h5 style={{marginTop:"15px"}}>Riepilogo Scorso Allenamento:</h5>
          <p style={{margin:"5px"}}>Ripetizioni: {esercizio.getLastRep().join(" - ")}</p>
          <p style={{margin:"5px"}}>Carico: {esercizio.getLastCarico().join(" - ")}</p>
          <p style={{margin:"5px"}}>Tempo Di Recupero: {esercizio.getLastTempoRecupero().join(" - ")}</p>
        </div>

          <>
            <Form>
              <Form.Group className="mb-5">
                {Array.from({ length: esercizio.serie}, (_, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    {/* Ripetizioni */}
                    <Form.Control
                      type="number"
                      placeholder={esercizioRaw.repOrTime ? "Secondi" : "Ripetizioni"}
                      className="input-viola"
                      value={ripetizioni[i] || ""}
                      onChange={(e) => {
                        const newRipetizioni = [...ripetizioni];
                        newRipetizioni[i] = e.target.value || "";
                        setRipetizioni(newRipetizioni);
                      }}
                    />

                    {/* Carico */}
                    <Form.Control
                      type="number"
                      placeholder="Carico"
                      className="input-viola"
                      value={carico[i] || ""}
                      onChange={(e) => {
                        const newCarico = [...carico];
                        newCarico[i] = e.target.value || "";
                        setCarico(newCarico);
                      }}
                    />

                    {/* Tempo di Recupero */}
                    <Form.Control
                      type="number"
                      placeholder="Tempo di Recupero"
                      className="input-viola"
                      value={tempoRecupero[i] || ""}
                      onChange={(e) => {
                        const newTempoRecupero = [...tempoRecupero];
                        newTempoRecupero[i] = e.target.value || "";
                        setTempoRecupero(newTempoRecupero);
                      }}
                    />
                  </div>
                ))}

                {showMessage && <h1>{message}</h1>}

                <Button type="submit" onClick={cambiaStatoEs}>Completa Esercizio</Button>
              </Form.Group>
            </Form>
            
            <Grafico esercizio={esercizio}></Grafico>
          </>

        {esercizioRaw.descrizione.split('|').map((sezione, i) => (
          sezione.split("§").map((sezione, i) => (
            <p key={i} style={{textAlign:"left"}}>{sezione.trim()}</p>
          ))
        ))}

        <img 
          src={esercizioRaw.immaginiVideo[esercizioRaw.immaginiVideo.length - 1]} 
          alt="Ultima immagine" 
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card.Body>
      <Button onClick={() => setShowModal(true)} style={{marginTop:"20px"}}>elimina</Button>
    </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-glass">
          <Modal.Title>conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-header-glass">
        <Form.Label>Sei sicuro di voler eliminare l'esercizio: {esercizioRaw.nome}</Form.Label>
        <Form.Label>dalla scheda: {scheda.tipologia}</Form.Label>
        </Modal.Body>
        <Modal.Footer className="modal-header-glass">
          <Button variant="primary" onClick={elimina}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default dettaglioEsercizioScheda;