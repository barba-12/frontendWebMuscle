import { Scheda } from "../models/Scheda";
import { EsercizioScheda } from "../models/EsercizioScheda";

// src/db/indexedDB.js
const DB_NAME = "AllenamentiDB";
const STORE_NAME = "schede";
const DB_VERSION = 1;

// 🔹 Funzione per aprire/creare il DB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 🔹 Salva o aggiorna una scheda
export async function saveScheda(scheda) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(scheda);
  return tx.complete;
}

// 🔹 Recupera una scheda
export async function getScheda(id) {
  const db = await openDB();
  return new Promise((resolve) => {
    const req = db.transaction(STORE_NAME, "readonly")
      .objectStore(STORE_NAME)
      .get(id);
    req.onsuccess = () => resolve(req.result);
  });
}

// 🔹 Recupera tutte le schede
export async function getAllSchede() {
  const db = await openDB();
  return new Promise((resolve) => {
    const req = db.transaction(STORE_NAME, "readonly")
      .objectStore(STORE_NAME)
      .getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

// 🔹 Elimina una scheda
export async function deleteScheda(id) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete(id);
  return tx.complete;
}

export async function checkStatusExercise(){
  const oggi = new Date();
  const giorno = oggi.getDay();
  const schede = await getAllSchede();

  //refreshare ogni domenica (0)
  if(giorno != 0) {
    for (const scheda of schede) {
      const nuovaScheda = new Scheda({
        id: scheda.id,
        tipologia: scheda.tipologia,
        giorniAllenamento: scheda.giorni.length,
      });
  
      nuovaScheda.setGiorni(scheda.giorni);
  
      scheda.esercizi.forEach(e => {
        const idUnivoco = e.idUnivoco;
        const idEsercizio = e.idEsercizio?.idEsercizio || e.idEsercizio;
        const ripetizioni = e.ripetizioni;
        const serie = e.serie;
        const tempoRecupero = e.tempoRecupero;
        const carico = e.carico;
        const giorno = e.giorni;
        const completato = e.completato;
  
        const newEs = new EsercizioScheda(
          idUnivoco,
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

      nuovaScheda.resetCompletatoEs();

      await saveScheda(nuovaScheda);
    }
  }
  console.log(schede);
}