import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllSchedeDB } from "../../db/DBschede";

function Scheda({ schedaId }) {
  const navigate = useNavigate();
  const [scheda, setScheda] = useState(null);

  useEffect(() => {
    async function fetchScheda() {
      try {
        const tutteLeSchede = await getAllSchedeDB(); // recupera tutte le schede
        const schedaTrovata = tutteLeSchede.find(s => s.id === schedaId);
        setScheda(schedaTrovata || null); // salva la scheda trovata o null
      } catch (error) {
        console.error("Errore nel recupero delle schede:", error);
      }
    }

    fetchScheda();
  }, [schedaId]);

  const handleClick = () => {
    navigate(`/giorni/${schedaId}`);
  };

  if (!scheda) return <div>Caricamento scheda...</div>;

  return (
    <Card className="project-card-view" onClick={handleClick}>
      <Card.Body>
        <Card.Title>{scheda.tipologia}</Card.Title>
        <Card.Text>
          Giorni di allenamento: {scheda.giorniAllenamento}
        </Card.Text>    
      </Card.Body>
    </Card>
  );
}

export default Scheda;