import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Scheda as SchedaClasse } from "../../models/Scheda";

function Giorni() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scheda } = location.state || {};
  const schedaClass = new SchedaClasse({
    id: scheda.id,
    tipologia: scheda.tipologia,
    giorniAllenamento: scheda.giorniAllenamento
  });

  schedaClass.setGiorni(scheda.giorni);
  schedaClass.setEsercizi(scheda.esercizi);

  const handleClick = (giorno) => {
    navigate("/eserciziXGiorno", { state: { scheda, giorno } });
  };

  return (
    <>
      <Link to="/schede">
        <Button variant="primary">back</Button>
      </Link>

      {scheda.giorni.map((giorno, index) => (
        <Card
          key={index}
          className="project-card-view"
          style={{ marginBottom: "5%" }}
          onClick={() => handleClick(giorno)}
        >
          <Card.Body>
            <div className="card-workout-day">
              <strong>{giorno}</strong>
              <p>{schedaClass.getNumEsXGiorno(giorno)}</p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Giorni;