import {React , useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import VideoPlayer from "../videoPlayer";
import { Scheda } from "../../models/Scheda";
import { EsercizioScheda } from "../../models/EsercizioScheda";
import { saveScheda } from "../../db/indexedDB";


function esercizioScheda() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scheda, esercizio } = location.state || {};
  const [activeVideoId, setActiveVideoId] = useState(null);

  const isEsercizioScheda = esercizio && typeof esercizio.ripetizioni !== "undefined";

  function cambiaStatoEs() {
    const nuovaScheda = new Scheda({
      id: scheda.id,
      tipologia: scheda.tipologia,
      giorniAllenamento: scheda.giorni.length,
    });

    nuovaScheda.setGiorni(scheda.giorni);

    scheda.esercizi.forEach(e => {
      const idEsercizio = e.idEsercizio?.idEsercizio || e.idEsercizio;
      const ripetizioni = e.ripetizioni?.[0];
      const serie = e.serie?.[0];
      const tempoRecupero = e.tempoRecupero?.[0];
      const carico = e.carico?.[0];
      const giorno = e.giorni?.[0];
      const completato = e.completato;

      const newEs = new EsercizioScheda(
        idEsercizio,
        ripetizioni,
        serie,
        tempoRecupero,
        carico,
        giorno,
        completato
      );

      if (e.giorni.length > 1) {
        for (let i = 1; i < e.giorni.length; i++) {
          newEs.addGiorno(e.giorni[i]);
        }
      }

      nuovaScheda.addEsercizio(newEs);
    });

    console.log(nuovaScheda.esercizi);

    nuovaScheda.esercizi.forEach(es => {
      if (es.getIdEsercizio() === esercizio.id) {
        es.setCompletato(true);
        console.log("Esercizio completato modificato");
        return; // Esci dal loop una volta trovato (se vuoi)
      }
    });

    saveScheda(nuovaScheda);
    navigate(-1);
  }

  return (
    <Card className="project-card-view">
      <Button variant="primary" onClick={() => navigate(-1)}>back</Button>

      <Card.Body>
        {esercizio.immaginiVideo && esercizio.immaginiVideo.length > 0 && (
          <VideoPlayer
            videos={esercizio.immaginiVideo}
            esercizioId={esercizio.id}
            activeVideoId={activeVideoId}
            setActiveVideoId={setActiveVideoId}
          />
        )}

        <h1>{esercizio.nome}</h1>

        {isEsercizioScheda && (
          <>
            <h2>Num serie: {esercizio.serie}</h2>
            <h2>Num rep (x serie): {esercizio.ripetizioni}</h2>
            <h2>Peso: {esercizio.carico}</h2>
            <h2>Tempo di recupero: {esercizio.tempoRecupero}s</h2>
            <button onClick={cambiaStatoEs}>Conferma esercizio fatto</button>
            <h2>Grafico del peso per ogni settimana</h2>
          </>
        )}

        {esercizio.descrizione.split('|').map((sezione, i) => (
          sezione.split("§").map((sezione, i) => (
            <p key={i} style={{textAlign:"left"}}>{sezione.trim()}</p>
          ))
        ))}

        <img 
          src={esercizio.immaginiVideo[esercizio.immaginiVideo.length - 1]} 
          alt="Ultima immagine" 
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card.Body>
    </Card>
  );
}

export default esercizioScheda;