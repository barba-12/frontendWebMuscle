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
      </Card.Body>
    </Card>
  );
}

export default Scheda;
