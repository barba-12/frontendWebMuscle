import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Esercizio from "./esercizio";
import { Link, useLocation, useNavigate } from "react-router-dom";
import exerciseData from "../../data/exercise";

function PaginaEsercizi({ esercizi }) {
  const location = useLocation();
  const { scheda, giorno } = location.state || {};
  const [es, setEs] = useState(esercizi || []);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!esercizi && scheda) {
      setButton(false);

      const eserciziCompleti = scheda.esercizi.map(item => {
        const dettagliEsercizio = exerciseData.find(e => e.id === item.idEsercizio);
        if (!dettagliEsercizio) return null; // sicurezza: skip se non trovato

        return {
          ...dettagliEsercizio,
          // aggiungo i dati specifici della scheda
          ripetizioni: item.ripetizioni,
          serie: item.serie,
          tempoRecupero: item.tempoRecupero,
          carico: item.carico,
          giorni: item.giorni
        };
      }).filter(e => e !== null); // rimuovo eventuali null

      const eserciziCompletiFiltrati = eserciziCompleti.filter(item => 
        item.giorni.includes(giorno) && !item.completato
      );

      setEs(eserciziCompletiFiltrati);
    }
  }, [esercizi, scheda]);

  function handleClick() {
    navigate("/giorni", { state: { scheda } });
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
          {es.map((ex, i) => (
            <Col md={4} className="project-card" key={i}>
              <Esercizio
               scheda={scheda}
                esercizio={ex}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
                addButton={false}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default PaginaEsercizi;