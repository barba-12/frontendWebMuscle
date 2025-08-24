import {React , useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { saveScheda } from "../../db/indexedDB";
import exerciseData from "../../data/exercise";
import { getAllSchede } from "../../db/indexedDB";

function esercizioScheda() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { IdEsercizio, schedaId } = useParams();
  const [esercizioRaw, setEsercizioRaw] = useState(exerciseData.find(es => es.id == IdEsercizio));
  const [ripetizioni, setRipetizioni] = useState([]);
  const [carico, setCarico] = useState([]);
  const [tempoRecupero, setTempoRecupero] = useState([]);
  const [scheda, setScheda] = useState(null);
  const [isEsercizioScheda, setIsEsercizioScheda] = useState(schedaId != null);

  useEffect(() => {
    if(isEsercizioScheda){
      async function fetchScheda() {
        try {
          const tutteLeSchede = await getAllSchede(); // recupera tutte le schede
          const schedaTrovata = tutteLeSchede.find(s => s.id.toString() === schedaId);
          setScheda(schedaTrovata || null); // salva la scheda trovata o null
        } catch (error) {
          console.error("Errore nel recupero delle schede:", error);
        }
      }

      fetchScheda();
    }
  }, []);

  function cambiaStatoEs(e) {
    e.preventDefault();
    const nuovaScheda = new Scheda({
      id: scheda.id,
      tipologia: scheda.tipologia,
      giorniAllenamento: scheda.giorni.length,
    });

    nuovaScheda.setGiorni(scheda.giorni);

    scheda.esercizi.forEach(e => {
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

    console.log(nuovaScheda.esercizi);

    nuovaScheda.esercizi.forEach(es => {
      console.log(es.getIdUnivoco());
      console.log(esercizioScheda.idUnivoco);
      if (es.getIdUnivoco() === esercizioScheda.idUnivoco) {
        es.addRipetizione(ripetizioni);
        es.addTempoRecupero(tempoRecupero);
        es.addCarico(carico);
        es.setCompletato(true);
        console.log("Esercizio completato modificato");
      }
    });

    saveScheda(nuovaScheda);
    navigate(`/eserciziXGiorno/${schedaId}/${giorno}`);
  }

  return (
    <Card className="project-card-view">
      <Button variant="primary" onClick={() => navigate(-1)}>back</Button>
      {console.log(IdEsercizio)}
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

        {isEsercizioScheda && (
          <>
            <Form>
              <Form.Group className="mb-5">
                {console.log(esercizioRaw)}
                {Array.from({ length: esercizioRaw.serie}, (_, i) => (
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
            <h2>Grafico del peso per ogni settimana</h2>
          </>
        )}

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
    </Card>
  );
}

export default esercizioScheda;