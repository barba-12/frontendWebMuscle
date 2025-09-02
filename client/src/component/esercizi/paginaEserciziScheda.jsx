import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { getAllSchede } from "../../db/DBschede";
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
        const newEs = new EsercizioScheda(
          e.idUnivoco,
          e.idEsercizio,
          e.giorno,
          e.ripetizioni,
          e.serie,
          e.tempoRecupero,
          e.carico,
          e.completato,
          e.activated
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
          {es.filter(ex => ex.activated).map((ex, i) => {
            return (
              <Col md={4} className="project-card desktop-margin-right" key={i}>
                <CardEsercizioScheda
                  schedaId={schedaId}
                  esercizioId={ex.idUnivoco}
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