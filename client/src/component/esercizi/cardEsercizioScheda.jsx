import React, { useState, useEffect, use } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import exerciseData from "../../data/exercise";
import { getAllSchede } from "../../db/indexedDB";

function cardEsercizioScheda({ schedaId, esercizio, activeVideoId, setActiveVideoId }) {
  const [showForm, setShowForm] = useState(false);
  const [giorno, setGiorno] = useState("");
  const [serie, setSerie] = useState();
  const [ripetizioni, setRipetizioni] = useState();
  const [carico, setCarico] = useState();
  const [tempoRecupero, setTempoRecupero] = useState();
  const [esercizioRaw, setEsercizioRaw] = useState(exerciseData.find(es => es.id == esercizio.idEsercizio));
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

  //cercare esercizio in exercisedata da idEsercizio cosi da trovare l'es row

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

        {/*devo passare scheda ed esercizio*/}

          <Link to={`/dettaglioEsScheda/${esercizio.idUnivoco}/${schedaId}`}>
            <Button variant="primary">
              visualizza dettagli
            </Button>
          </Link>
      </Card.Body>
    </Card>
  );
}

export default cardEsercizioScheda;