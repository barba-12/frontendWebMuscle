import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { getAllSchede } from "../../db/indexedDB";
import CardEsercizioScheda from "./cardEsercizioScheda"; 

function PaginaEserciziScheda() {
  const location = useLocation();
  const { schedaId, giorno } = useParams();
  const [es, setEs] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
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
    if (!scheda) return;
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

      setEs(nuovaScheda.getEsXGiornoENonCompletato(giorno));
  }, [scheda, location]);

  function handleClick() {
    navigate(`/giorni/${schedaId}`);
  }

  return (
    <Container fluid className="project-section">
      <Container>
        <Button variant="primary" onClick={handleClick}>back</Button>

        <h1 className="project-heading">Exercise</h1>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {es.map((ex, i) => {
            return (
              <Col md={4} className="project-card" key={i}>
                <CardEsercizioScheda
                  schedaId={schedaId}
                  esercizio={ex}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

export default PaginaEserciziScheda;