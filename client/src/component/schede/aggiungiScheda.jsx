import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import eserciziData from "../../data/exercise";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { getIncrementalId } from "../generatoreID/generatoreID";

import { EsercizioDoppione } from "../../models/EsercizioDoppione";
import { saveScheda } from "../../db/DBschede";   //salvare tutti gli esercizi con instanza esercizioClone
import { saveEsercizioBase } from "../../db/DBdatiEsercizi";   //salvare gli esercizi solo una volta con i dati

function AggiungiScheda() {
  const navigate = useNavigate();
  const giorniSettimana = ["Lunedi", "Martedi", "Mercoledi", "Giovedi","Venerdi", "Sabato", "Domenica"];
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  // Stato esercizi selezionati
  const [eserciziSelezionati, setEserciziSelezionati] = useState(() => {
    const salvati = sessionStorage.getItem("eserciziSelezionati");
    if (salvati) {
      return JSON.parse(salvati);
    }
    return [];
  });

  // Stato nome e giorni della scheda
  const schedaSalvata = sessionStorage.getItem("scheda")
    ? JSON.parse(sessionStorage.getItem("scheda"))
    : { nome: "", giorniAllenamento: [] };

  const [nomeScheda, setNomeScheda] = useState(schedaSalvata.nome || "");
  const [giorni, setGiorni] = useState(schedaSalvata.giorniAllenamento || []);

  useEffect(() => {
    // Aggiorna scheda
    const scheda = { nome: nomeScheda, giorniAllenamento: giorni };
    sessionStorage.setItem("scheda", JSON.stringify(scheda));

    // Aggiorna eserciziSelezionati mantenendo tutti i dati degli esercizi
    setEserciziSelezionati(prevEs => {
      const nuoviEsercizi = giorni.map(g => {
        // Trova il giorno esistente mantenendo tutti i dati degli esercizi
        const esistente = prevEs.find(item => item[0] === g);
        return esistente || [g, []];
      });
      
      sessionStorage.setItem("eserciziSelezionati", JSON.stringify(nuoviEsercizi));
      return nuoviEsercizi;
    });
  }, [nomeScheda, giorni]);

  // Seleziona / deseleziona giorno
  const handleGiornoChange = (giorno) => {
    setGiorni(prev => {
      if (prev.includes(giorno)) {
        return prev.filter(g => g !== giorno);
      } else {
        return [...prev, giorno];
      }
    });
  };

  const checkError = () => {
    //controllare che il nome della scheda sia coretto,  nomeScheda != ""
    if(nomeScheda === "") return {ok : false, message: "inserire il nome delle scheda"};
    //che ci sia almeno un giorno selezionato,   esercizioSelezionati in sessionStorage != []

    if (!Array.isArray(eserciziSelezionati) || eserciziSelezionati.length === 0) {
      return { ok: false, message: "Seleziona almeno un giorno" };
    }

    // 3. Tutti i giorni selezionati devono avere almeno un esercizio
    for (const [giorno, esercizi] of eserciziSelezionati) {
      if (!Array.isArray(esercizi) || esercizi.length === 0) {
        return { 
          ok: false, 
          message: `Il giorno ${giorno} non ha nessun esercizio` 
        };
      }
    }

    // Se tutti i controlli passano
    return { ok: true, message: "Dati validi" };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = checkError();
    if(result.ok){

      // Recupero scheda ed esercizi da sessionStorage
      const schedaRaw = JSON.parse(sessionStorage.getItem("scheda")) || {};
      const eserciziSelezionati = JSON.parse(sessionStorage.getItem("eserciziSelezionati")) || [];

      // 🔹 Creo un oggetto Scheda
      const nuovaScheda = new Scheda({
        id: Date.now(),  // id univoco per IndexedDB
        tipologia: schedaRaw.nome || "Scheda senza nome",
        giorniAllenamento: giorni.length,
      });

      for (const [nomeGiorno, esercizi] of eserciziSelezionati) {
        for (const e of esercizi) {
          const id = await getIncrementalId(); // attendo l'id incrementale
          nuovaScheda.addEsercizio(new EsercizioDoppione(
            id,
            e[0],        // id esercizio
            nomeGiorno,
            //e[2] || 0,   // ripetizioni
            //e[1] || 0,   // serie
            //e[4] || 0,   // tempo recupero
            //e[3] || 0,   // carico
            false,
            e[5]
          ));

          saveEsercizioBase(new EsercizioScheda(
            e[0],        // id esercizio
            e[2] || 0,   // ripetizioni
            e[1] || 0,   // serie
            e[4] || 0,   // tempo recupero
            e[3] || 0,   // carico
          ));
        }
      }

      try {
        await saveScheda(nuovaScheda);

        sessionStorage.removeItem("scheda");
        sessionStorage.removeItem("eserciziSelezionati");
        // Dopo il salvataggio vai alla pagina successiva
        navigate("/schede");
      } catch (err) {
        console.error("Errore salvataggio IndexedDB:", err);
      }
    } else {
      setShowMessage(true);
      setMessage(result.message);
    }
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <Col md={12} className="schede-card">
        <Card className="project-card-view">
          <Card.Body>
            <Button variant="primary" onClick={() => navigate("/schede")}>Schede</Button>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-5">
                <Form.Control
                  type="text"
                  placeholder="Nome scheda"
                  className="input-custom"
                  value={nomeScheda}
                  onChange={e => setNomeScheda(e.target.value)}
                />
              </Form.Group>

              <h6 style={{color:"white"}}>Seleziona giorni di allenamento:</h6>
              <Form.Group className="mb-4">
                {giorniSettimana.map((giorno, index) => (
                    <React.Fragment key={giorno}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={`btn-check-${index}`}
                        autoComplete="off"
                        checked={giorni.includes(giorno)}
                        onChange={() => handleGiornoChange(giorno)}
                      />
                      <label className="btn btn-viola" htmlFor={`btn-check-${index}`} style={{marginBottom:"10px"}}>
                        {giorno}
                      </label>
                    </React.Fragment>
                ))}
              </Form.Group>

              {giorni.length > 0 && (
                <div style={{marginBottom:"30px"}}>
                  <h6>Riepilogo esercizi:</h6>
                  {eserciziSelezionati
                    .filter(([g]) => giorni.includes(g)) // Mostra solo giorni selezionati
                    .map(([giorno, esercizi]) => (
                      <div key={giorno}>
                        <strong>{giorno}:</strong>{" "}
                        {esercizi.length > 0
                          ? esercizi.map(es => {
                              const id = es[0];
                              const esercizio = eserciziData.find(e => e.id === id);
                              return esercizio ? esercizio.nome : "Sconosciuto";
                            }).join(", ")
                          : "Nessun esercizio"}
                      </div>
                    ))}
                </div>
              )}
              
                {showMessage && (
                  <div className="alert alert-warning alert-warning-login" role="alert">
                    {message}
                  </div>
                )}

              <Button variant="primary" onClick={() => navigate("/addEsScheda")} style={{marginRight:"30px"}}>Scegli esercizi</Button>
              <Button type="submit">Invia</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AggiungiScheda;