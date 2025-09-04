import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Card, Modal, Form, InputGroup  } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import exerciseData from "../../data/exercise";
import { getAllSchedeDB, saveScheda } from "../../db/DBschede";
import { getEsercizioBase, getEsercizioBaseOmettendoPrimi, saveEsercizioBase } from "../../db/DBdatiEsercizi";
import Grafico from "../grafico/grafico";
import { EsercizioDoppione } from "../../models/EsercizioDoppione";

function dettaglioEsercizioScheda() {
  const navigate = useNavigate();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { esercizioId, schedaId } = useParams();
  const [esercizioRaw, setEsercizioRaw] = useState();
  const [esercizio, setEsercizio] = useState();
  const [esercizioDB, setEsercizioDB] = useState();
  const [datiEs, setDatiEs] = useState([0, 0, 0]);
  const [ripetizioni, setRipetizioni] = useState([]);
  const [carico, setCarico] = useState([]);
  const [tempoRecupero, setTempoRecupero] = useState([]);
  const [scheda, setScheda] = useState();
  const [schedaDB, setSchedaDB] = useState();
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // tempo rimanente
  const [isRunning, setIsRunning] = useState(false);
  const [showDettagli, setShowDettagli] = useState(false); // stato per dettagli

  //esercizio = datiEsercizio
  //scheda contiene tutti gli es senza dati
  //raw = raw

  /*useEffect(() => {
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
          nuovaScheda.addEsercizio(new EsercizioDoppione(
            e.idUnivoco,
            e.idEsercizio,
            e.giorno,
            e.completato,
            e.activated
          ));
        });

        // la scheda
        setScheda(nuovaScheda);

        const esercizioTrovato = nuovaScheda.getEsByIdUnivoco(esercizioId);
        const esercizioDatiDB = await getEsercizioBase(esercizioTrovato.idEsercizio);
        setEsercizio(new EsercizioScheda(
          esercizioTrovato.idEsercizio,
          esercizioDatiDB.ripetizioni,
          esercizioDatiDB.serie,
          esercizioDatiDB.tempoRecupero,
          esercizioDatiDB.carico
        ));

        setEsercizioRaw(exerciseData.find(es => es.id == esercizioTrovato.idEsercizio));
      } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScheda();
  }, [schedaId, esercizioId]);*/

  let breve = "";
  let dettagliata = "";
  let righeBreve = [];
  let righeDettagliate = [];

  if (esercizioRaw) {
    [breve, dettagliata] = esercizioRaw.descrizione.split("|");
    righeBreve = breve.split("§").map(r => r.trim());
    righeDettagliate = dettagliata ? dettagliata.split("§").map(r => r.trim()) : [];
  }

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
          nuovaScheda.addEsercizio(new EsercizioDoppione(
            e.idUnivoco,
            e.idEsercizio,
            e.giorno,
            e.completato,
          ));
        });

        // qui la scheda è pronta
        //setSchedaDB(nuovaScheda);
        setScheda(nuovaScheda);

        const esercizioTrovato = nuovaScheda.getEsByIdUnivoco(esercizioId);

        const esercizioDatiDB = await getEsercizioBase(esercizioTrovato.idEsercizio);
        const esercizioDati = await getEsercizioBaseOmettendoPrimi(esercizioTrovato.idEsercizio);

        console.log(esercizioDati);

        //tutti i dati
        setEsercizioDB(new EsercizioScheda(
          esercizioTrovato.idEsercizio,
          esercizioDati.ripetizioni,
          esercizioDati.serie,
          esercizioDati.tempoRecupero,
          esercizioDati.carico
        ));

        //esclusi il primo elemnto di ogni lista
        setEsercizio(new EsercizioScheda(
          esercizioTrovato.idEsercizio,
          esercizioDatiDB.ripetizioni,
          esercizioDatiDB.serie,
          esercizioDatiDB.tempoRecupero,
          esercizioDatiDB.carico
        ));

        setDatiEs([esercizioDatiDB.ripetizioni[0], esercizioDatiDB.carico[0], esercizioDatiDB.tempoRecupero[0]]);
        setEsercizioRaw(exerciseData.find(es => es.id == esercizioTrovato.idEsercizio));
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

  // Effetto che gestisce il timer
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Avvia timer
  const startTimer = (seconds) => {
    setTimeLeft(seconds);
    setIsRunning(true);
  };

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

      //scheda modifico attributo completato nell'esercizio
      const esercizioTrovato = scheda.getEsByIdUnivoco(esercizioId);
      esercizioTrovato.setCompletato(true);
      saveScheda(scheda);

      //aggingo i valori nell'esercizio con stesso idEsercizio nel secondo DB

      esercizio.addRipetizione(newRip.map(Number));
      esercizio.addTempoRecupero(newTempo.map(Number));
      esercizio.addCarico(newCarico.map(Number));

      saveEsercizioBase(esercizio);

      if(scheda.getNumEsXGiornoAttivi(scheda.getEsByIdUnivoco(esercizioId).giorno) == 0) navigate(`/giorni/${schedaId}`);
      else navigate(`/eserciziXGiorno/${schedaId}/${scheda.getEsByIdUnivoco(esercizioId).giorno}`);
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
    const giornoEs = scheda.getEsByIdUnivoco(esercizioId).giorno;
    scheda.eliminaEsercizio(esercizioId);
    saveScheda(scheda);

    if(scheda.getNumEsXGiorno(giornoEs) == 0) navigate(`/giorni/${schedaId}`);
    else navigate(`/eserciziXGiorno/${schedaId}/${giornoEs}`);
  }

  const impostaRecupero = () => {
    if(esercizioRaw.repOrTime){
      let tempoRecupero = []
      console.log(tempoRecupero);
      for(let i=0; i<esercizio.serie; i++) tempoRecupero[i] = (esercizio.ripetizioni);
      setTempoRecupero(tempoRecupero);
      console.log(tempoRecupero);
    } else {
      let tempoRecupero = []
      console.log(tempoRecupero);
      for(let i=0; i<esercizio.serie; i++) tempoRecupero[i] = (datiEs[2]);
      setTempoRecupero(tempoRecupero);
      console.log(tempoRecupero);
    }

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
      <Button variant="primary" onClick={() => navigate(`/eserciziXGiorno/${schedaId}/${scheda.getEsByIdUnivoco(esercizioId).giorno}`)}>back</Button>
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
            <h5 style={{marginTop:"15px"}}>Dati esercizio:</h5>
            <>
              {datiEs[0] > 0 && <p style={{ margin:"5px"}}>{esercizioRaw.repOrTime ? "Durata:" : "Ripetizioni:"} {datiEs[0]}</p>}
              {datiEs[1] > 0 && <p style={{ margin:"5px"}}>Carico: {datiEs[1]}</p>}
              {datiEs[2] > 0 && <p style={{ margin:"5px"}}>Recupero: {datiEs[2]}s</p>}
            </>
            {esercizioDB.getLastRep().length > 0 && 
              <>
                <h5 style={{marginTop:"15px"}}>Riepilogo Scorso Allenamento:</h5>
                {datiEs[2] > 0 && <p style={{margin:"5px"}}>Ripetizioni: {esercizioDB.getLastRep().join(" - ")}</p>}
                {datiEs[2] > 0 && <p style={{margin:"5px"}}>Carico: {esercizioDB.getLastCarico().join(" - ")}</p>}
                {datiEs[2] > 0 && <p style={{margin:"5px"}}>Tempo Di Recupero: {esercizioDB.getLastTempoRecupero().join(" - ")}</p>}
              </>
            }
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
          {Number(datiEs[2]) > 0 && <Button style={{marginTop:"20px"}} variant="primary" onClick={() => startTimer(Number(datiEs[2]))} disabled={isRunning}>{isRunning ? `${timeLeft}s` : `Timer Recupero: ${datiEs[2]}s`}</Button>}
          {esercizioRaw.repOrTime && <Button variant="primary" onClick={() => startTimer(Number(esercizio.ripetizioni))} disabled={isRunning}>{isRunning ? `${timeLeft}s` : `Timer Durata Esercizio: ${Number(esercizio.ripetizioni)}s`}</Button>}
          <Button onClick={() => impostaRecupero()}>imposta <strong>{esercizioRaw.repOrTime ? Number(esercizio.ripetizioni) : datiEs[2]}s</strong> su tutte le serie</Button>
          </div>

          <>
            <Form>
              <Form.Group className="mb-5">
                {Array.from({ length: esercizio.serie}, (_, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    {/* Ripetizioni */}
                    {datiEs[0] > 0 && (
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
                    )}

                    {/* Carico */}
                    {datiEs[1] > 0 && (
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
                    )}

                    {/* Tempo di Recupero */}
                    {datiEs[2] > 0 && (
                      <InputGroup>
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
                        <InputGroup.Text style={{background:"transparent", color:"#d8b3ff", border:"2px solid #5B1C86"}}>s</InputGroup.Text>
                      </InputGroup>
                    )}
                  </div>
                ))}

                {showMessage && <div className="alert alert-warning alert-warning-login" role="alert">{message}</div>}

                <Button type="submit" onClick={cambiaStatoEs}>Completa Esercizio</Button>
              </Form.Group>
            </Form>
            
            <Grafico esercizio={esercizioDB}></Grafico>
          </>

        {/* Spiegazione breve */}
        <div style={{ marginBottom: "1rem" }}>
          {righeBreve.map((riga, i) => (
            <p key={i} style={{ textAlign: "left", margin: "0.25rem 0" }}>
              {riga.trim()}
            </p>
          ))}
        </div>

        {righeDettagliate.length > 0 && (
          <button
            className="btn login-button"
            style={{marginBottom:"20px"}}
            onClick={() => setShowDettagli(!showDettagli)}
          >
            {showDettagli ? "Nascondi spiegazione dettagliata" : "Visualizza spiegazione dettagliata"}
          </button>
        )}

        {/* Spiegazione dettagliata */}
        {showDettagli && (
          <div style={{ marginBottom: "1.5rem" }}>
            {righeDettagliate.map((riga, i) => (
              <p key={i} style={{ textAlign: "left", margin: "0.25rem 0" }}>
                {riga.trim()}
              </p>
            ))}
          </div>
        )}

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