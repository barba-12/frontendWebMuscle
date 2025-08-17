import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import eserciziData from "../../data/exercise";
import { saveScheda } from "../../db/indexedDB";
import { Scheda } from "../../models/Scheda";
import { Giorno } from "../../models/Giorno";
import { EsercizioScheda } from "../../models/EsercizioScheda";

/*

  creare classe scheda
  salvarla su indexedDB

  una volta modificata la classe cheda bisogna sovrascriverla nel DB
  con await saveScheda(s);  // s = scheda aggiornata

 */

function AggiungiScheda() {
  const navigate = useNavigate();

  const giorniSettimana = [
    "lunedi",
    "martedi",
    "mercoledi",
    "giovedi",
    "venerdi",
    "sabato",
    "domenica",
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Recupero scheda ed esercizi da sessionStorage
    const schedaRaw = JSON.parse(sessionStorage.getItem("scheda")) || {};
    const eserciziSelezionati = JSON.parse(sessionStorage.getItem("eserciziSelezionati")) || [];

    // 🔹 Costruisco i Giorno con i relativi EsercizioScheda
    const giorni = eserciziSelezionati.map(([nomeGiorno, esercizi]) => {
      const eserciziScheda = esercizi.map(e => new EsercizioScheda(
        e[0],        // id esercizio
        e[1] || 0,   // ripetizioni
        e[2] || 0,   // serie
        e[3] || 0,   // tempo recupero
        e[4] || 0    // carico
      ));
      return new Giorno(nomeGiorno, eserciziScheda);
    });

    // 🔹 Creo un oggetto Scheda
    const nuovaScheda = new Scheda({
      id: Date.now(),  // id univoco per IndexedDB
      tipologia: schedaRaw.nome || "Scheda senza nome",
      giorniAllenamento: giorni.length,
      giorni
    });

    try {
      await saveScheda(nuovaScheda);
      console.log("Scheda salvata su IndexedDB:", nuovaScheda);

      // Dopo il salvataggio vai alla pagina successiva
      navigate("/pagSelezionaEs");
    } catch (err) {
      console.error("Errore salvataggio IndexedDB:", err);
    }
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <Col md={12} className="schede-card">
        <Card className="project-card-view">
          <Card.Body>
            <Button variant="primary" onClick={() => navigate(-1)}>Schede</Button>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-5">
                <Form.Control
                  type="text"
                  placeholder="Nome scheda"
                  className="input-viola"
                  value={nomeScheda}
                  onChange={e => setNomeScheda(e.target.value)}
                />
              </Form.Group>

              <Form.Text>Seleziona giorni di allenamento</Form.Text>
              <Form.Group className="mb-5">
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
                    <label className="btn btn-viola" htmlFor={`btn-check-${index}`}>
                      {giorno}
                    </label>
                  </React.Fragment>
                ))}
              </Form.Group>

              <div>
                <h5>Riepilogo esercizi:</h5>
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

              <Button variant="primary" onClick={() => navigate("/pagSelezionaEs")}>Scegli esercizi</Button>
              <Button type="submit">Invia</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AggiungiScheda;