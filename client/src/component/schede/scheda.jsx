import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Scheda({ scheda }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Naviga verso "/scheda-dettaglio" passando la scheda nello stato
    navigate("/giorni", { state: { scheda } });
  };

  return (
    <Card className="project-card-view" onClick={handleClick}>
      <Card.Body>
        <Card.Title>{scheda.tipologia}</Card.Title>

        <Card.Text>
          Giorni di allenamento: {scheda.giorniAllenamento}
        </Card.Text>    

        

        
            {/*scheda.giorni.map((giorno, index) => (
            <div key={index} className="card-workout-day">
                <strong>{giorno.nomeGiorno}</strong> – {giorno.esercizi.length} esercizi
                <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                {giorno.esercizi.map(({ esercizio: esercizioId, ripetizioni, serie, tempoRecupero, carico }) => {
                    // Trova l'esercizio completo dall'id
                    const esercizioCompleto = esercizi.find(e => e.id === esercizioId);

                    if (!esercizioCompleto) {
                    return (
                        <div key={esercizioId}>
                        Esercizio con ID {esercizioId} non trovato
                        </div>
                    );
                    }

                    return (
                    <Col md={3}>
                    <EsercizioXSchede
                        key={esercizioId}
                        esercizio={esercizioCompleto}
                        ripetizioni={ripetizioni}
                        serie={serie}
                        tempoRecupero={tempoRecupero}
                        carico={carico}
                    />
                    </Col>
                    );
                })}
                </Row>
            </div>
            ))*/}
      </Card.Body>
    </Card>
  );
}

export default Scheda;
