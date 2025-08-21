import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import VideoPlayer from "../videoPlayer";
import { Link } from "react-router-dom";

function ExerciseCard({ scheda, esercizio, activeVideoId, setActiveVideoId, addButton }) {
  const [showForm, setShowForm] = useState(false);
  const [giorno, setGiorno] = useState("");
  const [serie, setSerie] = useState(0);
  const [ripetizioni, setRipetizioni] = useState(0);
  const [carico, setCarico] = useState(0);
  const [tempoRecupero, setTempoRecupero] = useState(0);

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
  setSerie(0);
  setRipetizioni(0);
  setCarico(0);
  setTempoRecupero(0);
};

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

        <Link to="/esercizioScheda" state={{ esercizio, scheda }}>
          <Button variant="primary">visualizza dettagli</Button>
        </Link>

        {addButton && (
          <>
            <Button style={{ color: "green", marginTop: "10px" }} onClick={() => setShowForm(!showForm)}>
              add
            </Button>

            {showForm && (
              <div style={{ marginTop: "10px" }}>
                <select value={giorno} onChange={(e) => setGiorno(e.target.value)}>
                  <option value="">Seleziona giorno</option>
                  {giorniDisponibili.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>

                <input type="number" placeholder="Serie" value={serie} onChange={(e) => setSerie(parseInt(e.target.value))} />
                <input type="number" placeholder="Ripetizioni" value={ripetizioni} onChange={(e) => setRipetizioni(parseInt(e.target.value))} />
                <input type="number" placeholder="Carico" value={carico} onChange={(e) => setCarico(parseInt(e.target.value))} />
                <input type="number" placeholder="Tempo Recupero" value={tempoRecupero} onChange={(e) => setTempoRecupero(parseInt(e.target.value))} />

                <Button variant="success" style={{ marginTop: "5px" }} onClick={salvaEsercizio}>
                  Salva esercizio
                </Button>
              </div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;