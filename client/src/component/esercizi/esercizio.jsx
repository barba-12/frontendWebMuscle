import React, { useState, useEffect, use } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import exerciseData from "../../data/exercise";
import { getAllSchede } from "../../db/indexedDB";

function ExerciseCard({ schedaId, esercizio, activeVideoId, setActiveVideoId, addButton }) {
  const [showForm, setShowForm] = useState(false);
  const [giorno, setGiorno] = useState("");
  const [serie, setSerie] = useState();
  const [ripetizioni, setRipetizioni] = useState();
  const [carico, setCarico] = useState();
  const [tempoRecupero, setTempoRecupero] = useState();
  const [esercizioRaw, setEsercizioRaw] = useState(!(esercizio instanceof EsercizioScheda) ? esercizio : exerciseData.find(e => e.id == esercizio.idEsercizio));
  const [scheda, setScheda] = useState(null);

  useEffect(() => {
    if(schedaId == null){
      async function fetchScheda() {
        try {
          const tutteLeSchede = await getAllSchede(); // recupera tutte le schede
          const schedaTrovata = tutteLeSchede.find(s => s.id == schedaId);
          setScheda(schedaTrovata || null); // salva la scheda trovata o null
        } catch (error) {
          console.error("Errore nel recupero delle schede:", error);
        }
      }

      fetchScheda();
    }
  }, [schedaId]);

  // Giorni selezionati dall'utente nella scheda
  const giorniDisponibili = JSON.parse(sessionStorage.getItem("scheda"))?.giorniAllenamento || [];
    
  const salvaEsercizio = () => {
    if (!giorno) return alert("Seleziona un giorno");

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
    console.log("Scheda aggiornata:", nuovoScheda);

    // Reset form
    setShowForm(false);
    setGiorno("");
    setSerie();
    setRipetizioni();
    setCarico();
    setTempoRecupero();
  };

  const chiudiForm = () => {
    setShowForm(false);
  }

   //AGGIUNGERE CONTROLLI NON HTML5
  return (
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


         {/* se passo scheda id  */}

        {schedaId != null ? (
          <Link to={`/esercizioScheda/${esercizioRaw.id}/${schedaId}`}>
            <Button variant="primary">
              visualizza dettagli
            </Button>
          </Link>
        ) : (
          <Link to={`/esercizioScheda/${esercizio.idUnivoco}`}>
            <Button variant="primary">
              visualizza dettagli
            </Button>
          </Link>
        )}

        {addButton && (
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
                    <Form.Control type="number" placeholder="Serie" className="input-viola" value={serie} onChange={(e) => setSerie(parseInt(e.target.value))} />

                    <Form.Control type="number" placeholder={esercizioRaw.repOrTime ? "Secondi" : "Ripetizioni"} className="input-viola" value={ripetizioni} onChange={(e) => setRipetizioni(parseInt(e.target.value))} />

                    <Form.Control type="number" placeholder="Carico" className="input-viola" value={carico} onChange={(e) => setCarico(parseInt(e.target.value))} />

                    <Form.Control type="number" placeholder="Tempo Di Recupero" className="input-viola" value={tempoRecupero} onChange={(e) => setTempoRecupero(parseInt(e.target.value))} />

                    <Button type="submit" onClick={salvaEsercizio}>Aggiungi</Button>
                    <Button type="submit" onClick={chiudiForm}>X</Button>
                  </Form.Group>
                </Form>
              </div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;