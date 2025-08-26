import {React , useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { saveScheda } from "../../db/indexedDB";
import exerciseData from "../../data/exercise";
import { getAllSchede } from "../../db/indexedDB";
import Grafico from "../grafico/grafico";

function dettaglioEsercizioScheda() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { esercizioId, schedaId } = useParams();
  const [esercizioRaw, setEsercizioRaw] = useState();
  const [esercizio, setEsercizio] = useState();
  const [ripetizioni, setRipetizioni] = useState([]);
  const [carico, setCarico] = useState([]);
  const [tempoRecupero, setTempoRecupero] = useState([]);
  const [scheda, setScheda] = useState();
  const [loading, setLoading] = useState(true);

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

      console.log(nuovaScheda);
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

  function cambiaStatoEs(e) {
    e.preventDefault();

    scheda.esercizi.forEach(es => {
      if (es.getIdUnivoco() === esercizio.idUnivoco) {
        es.addRipetizione(ripetizioni);
        es.addTempoRecupero(tempoRecupero);
        es.addCarico(carico);
        es.setCompletato(true);
        console.log("Esercizio completato modificato");
      }
    });

    saveScheda(scheda);
    navigate(`/eserciziXGiorno/${schedaId}/${esercizio.giorno}`);
  }

  const modifica = () => {
    //creare componente a parte per i campi di input
  }

  const elimina = () => {
    scheda.eliminaEsercizio(esercizio.idUnivoco);
    saveScheda(scheda);
    navigate(`/eserciziXGiorno/${schedaId}/${esercizio.giorno}`);
  }

  if (loading) {
      return (
      <div className="d-flex justify-content-center align-items-center vh-100">
          <span className="visually-hidden">Caricamento...</span>
      </div>
      );
  }

  return (
    <Card className="project-card-view">
        {console.log(esercizio)}
        {console.log(esercizioRaw)}
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
          <h5>Riepilogo Scorso Allenamento:</h5>
          <p>Ripetizioni: {esercizio.getLastRep().join(" - ")}</p>
          <p>Carico: {esercizio.getLastCarico().join(" - ")}</p>
          <p>Tempo Di Recupero: {esercizio.getLastTempoRecupero().join(" - ")}</p>
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
                        newRipetizioni[i] = parseInt(e.target.value) || 0;
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
                        newCarico[i] = parseInt(e.target.value) || 0;
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
                        newTempoRecupero[i] = parseInt(e.target.value) || 0;
                        setTempoRecupero(newTempoRecupero);
                      }}
                    />
                  </div>
                ))}

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
      <Button onClick={modifica}>modifica</Button>
      <Button onClick={elimina} style={{marginTop:"20px"}}>elimina</Button>
    </Card>
  );
}

export default dettaglioEsercizioScheda;