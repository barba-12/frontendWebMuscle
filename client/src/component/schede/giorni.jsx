import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function giorni() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scheda, giorno } = location.state || {};

    const handleClick = (giorno) => {
        // Naviga verso "/scheda-dettaglio" passando la scheda nello stato
        navigate("/eserciziXGiorno", { state: { scheda, giorno } });
    };

  return (
    <>
    <Link to="/schede">
        <Button variant="primary">back</Button>
    </Link>
    {scheda.giorni.map((giorno, index) => (
        <Card className="project-card-view" style={{marginBottom: "5%"}} onClick={() => handleClick(giorno)}>
            <Card.Body>
                <div key={index} className="card-workout-day">
                    <strong>{giorno.nomeGiorno}</strong> – {giorno.esercizi.length} esercizi
                </div>
            </Card.Body>
        </Card>
    ))}
    </>
  );
}

export default giorni;
