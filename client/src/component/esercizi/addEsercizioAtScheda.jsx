import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { Scheda } from "../../models/Scheda";
import { saveScheda, getAllSchedeDB } from "../../db/indexedDB";
import { getIncrementalId } from "../generatoreID/generatoreID";

function addEsercizio({ idScheda, esercizio, activeVideoId, setActiveVideoId }) {
  const [showForm, setShowForm] = useState(false);
  const [giorno, setGiorno] = useState("");
  const [serie, setSerie] = useState("");
  const [ripetizioni, setRipetizioni] = useState("");
  const [carico, setCarico] = useState("");
  const [tempoRecupero, setTempoRecupero] = useState("");
  const [schedaRaw, setSchedaRaw] = useState();
  const [scheda, setScheda] = useState();
  const giorni = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchScheda() {
        try {
            const tutteLeSchede = await getAllSchedeDB(); // recupera tutte le schede
            const schedaTrovata = tutteLeSchede.find(s => s.id.toString() === idScheda);
            setSchedaRaw(schedaTrovata || null); // salva la scheda trovata o null
        } catch (error) {
            console.error("Errore nel recupero delle schede:", error);
        }
        }

        fetchScheda();
    }, [idScheda]);  

    useEffect(() => {
        if (!schedaRaw) return;
            const nuovaScheda = new Scheda({
            id: schedaRaw.id,
            tipologia: schedaRaw.tipologia,
            giorniAllenamento: schedaRaw.giorni.length,
            });
        
            nuovaScheda.setGiorni(schedaRaw.giorni);
        
            schedaRaw.esercizi.forEach(e => {
            const idUnivoco = e.idUnivoco;
            const idEsercizio = e.idEsercizio?.idEsercizio || e.idEsercizio;
            const ripetizioni = e.ripetizioni;
            const serie = e.serie;
            const tempoRecupero = e.tempoRecupero;
            const carico = e.carico;
            const giorno = e.giorno;
            const completato = e.completato;
        
            const newEs = new EsercizioScheda(
                idUnivoco,
                idEsercizio,
                giorno,
                ripetizioni,
                serie,
                tempoRecupero,
                carico,
                completato
            );

            nuovaScheda.addEsercizio(newEs);
            });

            setScheda(nuovaScheda);

    }, [schedaRaw]);

    const salvaEsercizio = async (e) => {
      e.preventDefault();
      const result = checkError();
      if (result.ok){
        const id = await getIncrementalId();
        const newEs = new EsercizioScheda(
            id,
            esercizio.id,
            giorno,
            Number(ripetizioni),
            Number(serie),
            Number(tempoRecupero),
            Number(carico),
            false
        );

        scheda.addEsercizio(newEs);

        saveScheda(scheda);

        // Reset form
        setShowForm(false);
        setGiorno("");
        setSerie("");
        setRipetizioni("");
        setCarico("");
        setTempoRecupero("");

        navigate("/schede");
      }
      else {
        setShowMessage(true);
        setMessage(result.message);
      }
    };

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
                <select value={giorno} onChange={(e) => setGiorno(e.target.value)} className="select-viola">
                  {giorni.map((g) => (
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