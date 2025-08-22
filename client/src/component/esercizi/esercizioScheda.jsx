import {React , useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import VideoPlayer from "../videoPlayer";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { saveScheda } from "../../db/indexedDB";


function esercizioScheda() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scheda, esercizio } = location.state || {};
  const [activeVideoId, setActiveVideoId] = useState(null);

  const [ripetizioni, setRipetizioni] = useState([]);
  const [carico, setCarico] = useState([]);
  const [tempoRecupero, setTempoRecupero] = useState([]);

  const isEsercizioScheda = esercizio && typeof esercizio.ripetizioni !== "undefined";

  function cambiaStatoEs() {
    const nuovaScheda = new Scheda({
      id: scheda.id,
      tipologia: scheda.tipologia,
      giorniAllenamento: scheda.giorni.length,
    });

    nuovaScheda.setGiorni(scheda.giorni);

    scheda.esercizi.forEach(e => {
      const idEsercizio = e.idEsercizio?.idEsercizio || e.idEsercizio;
      const ripetizioni = e.ripetizioni;
      const serie = e.serie;
      const tempoRecupero = e.tempoRecupero;
      const carico = e.carico;
      const giorno = e.giorni;
      const completato = e.completato;

      const newEs = new EsercizioScheda(
        idEsercizio,
        ripetizioni,
        serie,
        tempoRecupero,
        carico,
        giorno,
        completato
      );

      if (e.giorni.length > 1) {
        for (let i = 1; i < e.giorni.length; i++) {
          newEs.addGiorno(e.giorni[i]);
        }
      }

      nuovaScheda.addEsercizio(newEs);
    });

    console.log(nuovaScheda.esercizi);

    nuovaScheda.esercizi.forEach(es => {
      if (es.getIdEsercizio() === esercizio.id) {
        es.addRipetizione(ripetizioni);
        es.addTempoRecupero(tempoRecupero);
        es.addCarico(carico);
        es.setCompletato(true);
        console.log("Esercizio completato modificato");
      }
    });

    saveScheda(nuovaScheda);
    //navigate(-1);
  }

  return (
    <Card className="project-card-view">
      <Button variant="primary" onClick={() => navigate(-1)}>back</Button>

      <Card.Body>
        {esercizio.immaginiVideo && esercizio.immaginiVideo.length > 0 && (
          <VideoPlayer
            videos={esercizio.immaginiVideo}
            esercizioId={esercizio.id}
            activeVideoId={activeVideoId}
            setActiveVideoId={setActiveVideoId}
          />
        )}

        <h1>{esercizio.nome}</h1>

        {isEsercizioScheda && (
          <>
            <Form>
              <Form.Group className="mb-5">

                {Array.from({ length: esercizio.serie}, (_, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    {/* Ripetizioni */}
                    <Form.Control
                      type="number"
                      placeholder="Ripetizioni"
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

        {esercizio.descrizione.split('|').map((sezione, i) => (
          sezione.split("§").map((sezione, i) => (
            <p key={i} style={{textAlign:"left"}}>{sezione.trim()}</p>
          ))
        ))}

        <img 
          src={esercizio.immaginiVideo[esercizio.immaginiVideo.length - 1]} 
          alt="Ultima immagine" 
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card.Body>
    </Card>
  );
}

export default esercizioScheda;