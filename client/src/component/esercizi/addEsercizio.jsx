import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";

function addEsercizio({ esercizio, activeVideoId, setActiveVideoId }) {
  const [showForm, setShowForm] = useState(false);
  const [giorno, setGiorno] = useState("");
  const [serie, setSerie] = useState("");
  const [ripetizioni, setRipetizioni] = useState("");
  const [carico, setCarico] = useState("");
  const [tempoRecupero, setTempoRecupero] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  // Giorni selezionati dall'utente nella scheda
  const giorniDisponibili = JSON.parse(sessionStorage.getItem("scheda"))?.giorniAllenamento || [];
    
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
            [...listaEsercizi, [Number(esercizio.id), Number(serie), Number(ripetizioni), Number(carico), Number(tempoRecupero)]]
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

  const chiudiForm = () => {
    setShowForm(false);
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
          <strong className="purple">Muscoli allenati:</strong> {esercizio.muscoliAllenati}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Attrezzatura:</strong> {esercizio.attrezzatura}
        </Card.Text>
        <Card.Text>
          <strong className="purple">Difficoltà:</strong> {esercizio.difficoltà}
        </Card.Text>


         {/* se passo scheda id  */}
          <Link to={`/dettaglioEsGenerico/${esercizio.id}`}>
            <Button variant="primary">
              visualizza dettagli
            </Button>
          </Link>

          <>
            <Button style={{ color: "green", marginTop: "10px" }} onClick={() => setShowForm(!showForm)}>
              add
            </Button>

            {showForm && (
              <div style={{ marginTop: "10px" }}>
                <select className="select-viola" value={giorno} onChange={(e) => setGiorno(e.target.value)}>
                  <option value="">Seleziona giorno</option>
                  {giorniDisponibili.map((g) => (
                    <option key={g} value={g}> {g} </option>
                  ))}
                </select>

                <Form>
                  <Form.Group className="mb-5">
                    <Form.Control type="number" placeholder="Serie" className="input-viola" value={serie} onChange={(e) => setSerie(e.target.value)} />

                    <Form.Control type="number" placeholder={esercizio.repOrTime ? "Secondi" : "Ripetizioni"} className="input-viola" value={ripetizioni} onChange={(e) => setRipetizioni(e.target.value)} />

                    <Form.Control type="number" placeholder="Carico" className="input-viola" value={carico} onChange={(e) => setCarico(e.target.value)} />

                    <Form.Control type="number" placeholder="Tempo Di Recupero" className="input-viola" value={tempoRecupero} onChange={(e) => setTempoRecupero(e.target.value)} />

                    {showMessage && <h1>{message}</h1>}

                    <Button type="submit" onClick={salvaEsercizio}>Aggiungi</Button>
                    <Button type="submit" onClick={chiudiForm}>X</Button>
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