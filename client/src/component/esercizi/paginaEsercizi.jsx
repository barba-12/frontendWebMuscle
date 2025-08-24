import React, { useState, useEffect, useImperativeHandle } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import exerciseData from "../../data/exercise";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { getAllSchede } from "../../db/indexedDB";

function PaginaEsercizi({ esercizi }) {
  const location = useLocation();
  const { schedaId, giorno } = useParams();
  const [es, setEs] = useState(esercizi || []);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [button, setButton] = useState(!esercizi ? false : true);
  const navigate = useNavigate();
  const [scheda, setScheda] = useState(null);

  useEffect(() => {
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
  }, [schedaId]);

  useEffect(() => {
    if (!esercizi && scheda) {
      /*const eserciziCompleti = scheda.esercizi.map(item => {
        const dettagliEsercizio = exerciseData.find(e => e.id === item.idEsercizio);
        if (!dettagliEsercizio) return null; // sicurezza: skip se non trovato

        return {
          ...dettagliEsercizio,
          // aggiungo i dati specifici della scheda
          ripetizioni: item.ripetizioni,
          serie: item.serie,
          giorno: item.giorno,
          tempoRecupero: item.tempoRecupero,
          carico: item.carico,
          completato: item.completato
        };
      }).filter(e => e !== null); // rimuovo eventuali null

      const eserciziCompletiFiltrati = eserciziCompleti.filter(item => 
        item.giorno == giorno && !item.completato
      );*/

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

      //metodo per trovare tutti gli esercizi corrispondenti ad un giorno
      console.log(nuovaScheda);
      console.log(nuovaScheda.getEsXGiornoENonCompletato(giorno));
      setEs(nuovaScheda.getEsXGiornoENonCompletato(giorno));
    }
  }, [esercizi, scheda, location]);

  function handleClick() {
    navigate(`/giorni/${schedaId}`);
  }

  return (
    <Container fluid className="project-section">
      <Container>
        {button ? (
          <Link to="/schede">
            <Button variant="primary">Schede</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={handleClick}>back</Button>
        )}

        <h1 className="project-heading">Exercise</h1>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {es.map((ex, i) => {
            console.log("Esercizio:", ex); // stampa ogni elemento dell’array es
            return (
              <Col md={4} className="project-card" key={i}>
                <Esercizio
                  schedaId={schedaId}
                  esercizio={ex}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                  addButton={false}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

export default PaginaEsercizi;