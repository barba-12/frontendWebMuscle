import React, { useState, useEffect } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";
import { getEsercizioBase } from "../../db/DBdatiEsercizi"; 

function addEsercizio({ esercizio, activeVideoId, setActiveVideoId }) {
  const [showForm, setShowForm] = useState(false);
  const [giorno, setGiorno] = useState("");
  const [serie, setSerie] = useState("");
  const [ripetizioni, setRipetizioni] = useState("");
  const [carico, setCarico] = useState("");
  const [tempoRecupero, setTempoRecupero] = useState("");
  const [comment, setComment] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  // Giorni selezionati dall'utente nella scheda
  const giorniDisponibili = JSON.parse(sessionStorage.getItem("scheda"))?.giorniAllenamento || [];

  const scrollToTarget = () => {
    const element = document.getElementById("target");
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    if (showForm) {
      scrollToTarget();
    }
  }, [showForm]);

  useEffect(() => {
    if (!showForm) return;

    const fetchEsercizio = async () => {
      try {
        // sessionStorage
        const eserciziSelezionati =
          JSON.parse(sessionStorage.getItem("eserciziSelezionati")) || [];

        for (const [giornoKey, esercizi] of eserciziSelezionati) {
          const esTrovato = esercizi.find(
            (e) => e[0] === Number(esercizio.id)
          );
          if (esTrovato) {
            // [idEsercizio, serie, ripetizioni, carico, tempoRecupero]
            setGiorno(giornoKey);
            setSerie(esTrovato[1].toString());
            setRipetizioni(esTrovato[2].toString());
            setCarico(esTrovato[3].toString());
            setTempoRecupero(esTrovato[4].toString());
            setComment(esTrovato[5] || "");
            return;
          }
        }

        //IndexedDB
        const esDB = await getEsercizioBase(esercizio.id);
        console.log(esDB);
        if (esDB) {
          setGiorno(esDB.giorno || ""); // se hai il giorno salvato nel DB
          setSerie(esDB.serie?.toString() || "");
          setRipetizioni(esDB.ripetizioni?.[0]?.toString() || "");
          setCarico(esDB.carico?.[0]?.toString() || "");
          setTempoRecupero(esDB.tempoRecupero?.[0]?.toString() || "");
          setComment("");
          return;
        }
      } catch (err) {
        console.error("Errore nel recupero esercizio:", err);
      }
    };

    fetchEsercizio();
  }, [showForm, esercizio.id]);

  const salvaEsercizio = (e) => {
    e.preventDefault();
    const result = checkError();
    if (result.ok){
      // Leggo la scheda esistente o creo una nuova struttura
      const schedaGiorni = JSON.parse(sessionStorage.getItem("eserciziSelezionati")) 
        || giorniDisponibili.map(g => [g, []]);

      const nuovoScheda = schedaGiorni.map(([g, esercizi]) => {
        const listaEsercizi = Array.isArray(esercizi) ? esercizi : [];

        if (g === giorno) {
          // aggiungiamo il nuovo esercizio come array
          return [
            g,
            [...listaEsercizi, [Number(esercizio.id), Number(serie), Number(ripetizioni), Number(carico), Number(tempoRecupero), comment]]
          ];
        }

        return [g, listaEsercizi];
      });

      sessionStorage.setItem("eserciziSelezionati", JSON.stringify(nuovoScheda));

      // Reset form
      setShowForm(false);
      setGiorno("");
      setSerie("");
      setRipetizioni("");
      setCarico("");
      setTempoRecupero("");
      setComment("");
    }
    else {
      setShowMessage(true);
      setMessage(result.message);
    }
    
  };

  const checkError = () => {
    if(!giorno) return {ok : false, message: "Selezionare un giorno"};

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

   //AGGIUNGERE CONTROLLI NON HTML5
  return (
    <Card className="project-card-view">
      {esercizio.immaginiVideo && esercizio.immaginiVideo.length > 0 && (
        <VideoPlayer
          videos={esercizio.immaginiVideo}
          esercizioId={esercizio.id}
          activeVideoId={activeVideoId}
          setActiveVideoId={setActiveVideoId}
        />
      )}

      <Card.Body>
        <Card.Title>{esercizio.nome}</Card.Title>

        <Card.Text>
          <strong className="purple">Muscoli allenati:</strong> {esercizio.muscoliAllenati.join(" - ")}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Attrezzatura:</strong> {esercizio.attrezzatura.join(" - ")}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Difficoltà:</strong> {esercizio.difficoltà}
        </Card.Text>


         {/* se passo scheda id  */}
          <div style={{ 
              display: "flex", 
              flexWrap: "wrap",       // permette ai pulsanti di andare a capo su schermi piccoli
              gap: "8px",             // distanza uniforme tra pulsanti
              justifyContent: "center"  // allinea i pulsanti a sinistra, puoi cambiare in "center"
            }}>
            <Link to={`/dettaglioEsGenerico/${esercizio.id}`}>
              <Button variant="primary">
                visualizza dettagli
              </Button>
            </Link>
            
            <Button style={{ marginLeft:"3px" }} onClick={() => setShowForm(!showForm)}>
              {showForm ? "close" : "add"}
            </Button>
          </div>

          <>
            {showForm && (
              <div style={{ marginTop: "10px" }} id="target">
                <select className="select-viola" value={giorno} onChange={(e) => setGiorno(e.target.value)}>
                  <option value="">Seleziona giorno</option>
                  {giorniDisponibili.map((g) => (
                    <option key={g} value={g}> {g} </option>
                  ))}
                </select>

                <Form>
                  <Form.Group className="mb-4">
                    <Form.Control type="number" placeholder="Serie" className="input-viola" value={serie} onChange={(e) => setSerie(e.target.value)} style={{marginBottom:"5px"}}/>

                    <Form.Control type="number" placeholder={esercizio.repOrTime ? "Secondi" : "Ripetizioni"} className="input-viola" value={ripetizioni} onChange={(e) => setRipetizioni(e.target.value)} style={{marginBottom:"5px"}}/>

                    <Form.Control type="number" placeholder="Carico" className="input-viola" value={carico} onChange={(e) => setCarico(e.target.value)} style={{marginBottom:"5px"}}/>

                    <InputGroup>
                      <Form.Control type="number" placeholder="Tempo Di Recupero" className="input-viola" value={tempoRecupero} onChange={(e) => setTempoRecupero(e.target.value)} style={{marginBottom:"5px"}}/>
                      <InputGroup.Text style={{background:"transparent", color:"#d8b3ff", border:"2px solid #5B1C86", marginBottom:"5px"}}>s</InputGroup.Text>
                    </InputGroup>

                    <textarea placeholder="Commenti" className="form-control input-viola" aria-label="With textarea" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

                    {showMessage && (
                      <div className="alert alert-warning alert-warning-login" role="alert">
                        {message}
                      </div>
                    )}

                    <Button type="submit" onClick={salvaEsercizio} style={{marginTop:"20px"}}>Aggiungi</Button>
                  </Form.Group>
                </Form>
              </div>
            )}
          </>
      </Card.Body>
    </Card>
  );
}

export default addEsercizio;