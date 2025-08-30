import { Scheda } from "../models/Scheda";
import { EsercizioScheda } from "../models/EsercizioScheda";

// src/db/indexedDB.js
const DB_NAME = "AllenamentiDB";
const STORE_NAME = "schede";
const DB_VERSION = 1;

// 🔹 Funzione per aprire/creare il DB
export function openDB() {
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

// 🔹 Cancella completamente tutte le schede dal DB
export async function clearDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      console.log("Tutte le schede sono state eliminate da IndexedDB.");
      resolve(true);
    };

    clearRequest.onerror = () => {
      console.error("Errore durante la cancellazione delle schede da IndexedDB.");
      reject(clearRequest.error);
    };
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

export async function getAllSchedeDB() {
  const db = await openDB();

   const schedeDB = await new Promise((resolve) => {
    const req = db.transaction(STORE_NAME, "readonly")
      .objectStore(STORE_NAME)
      .getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve([]);
  });

  return schedeDB;
}

export async function getAllSchede() {
  const db = await openDB();
  let schedeFile = [];

  try {
      const basePath = import.meta.env.BASE_URL || "/";  // Vite mette BASE_URL
      const response = await fetch(`${basePath}schede.json`);
    if (response.ok) {
      schedeFile = await response.json();
    } else {
      console.error("Errore nel caricamento di schede.json:", response.status);
    }
  } catch (err) {
    console.error("Errore nel fetch di schede.json:", err);
  }

  console.log(schedeFile);

  const schedeDB = await new Promise((resolve) => {
    const req = db.transaction(STORE_NAME, "readonly")
      .objectStore(STORE_NAME)
      .getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve([]);
  });

  // merge: IndexedDB = struttura base, JSON = dati numerici
  const schedeFinali = schedeDB.map((schedaDB) => {
    const schedaFile = schedeFile.find((s) => s.id === schedaDB.id);

    if (!schedaFile) return schedaDB; // se non è nel file JSON, uso solo DB

    return {
      ...schedaDB,
      esercizi: schedaDB.esercizi.map((exDB) => {
        const exFile = schedaFile.esercizi.find((e) => e.idUnivoco === exDB.idUnivoco);
        if (!exFile) return exDB;

        return {
          ...exDB,
          ripetizioni: [...(exFile.ripetizioni || []), ...(exDB.ripetizioni || [])],
          carico: [...(exFile.carico || []), ...(exDB.carico || [])],
          tempoRecupero: [...(exFile.tempoRecupero || []), ...(exDB.tempoRecupero || [])],
        };
      }),
    };
  });

  console.log(schedeFinali);
  return schedeFinali;
}

// 🔹 Elimina una scheda
export async function deleteScheda(id) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete(id);
  return tx.complete;
}

export async function checkStatusExercise(){
  const schede = await getAllSchedeDB();
  const oggi = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
  const lastRun = localStorage.getItem('lastExerciseCheck');

  //refreshare gli esercizi del giorno di oggi (salvare risultato su localStorage per ricordare se si è gia fatto l'accesso oggi o meno)
    for (const scheda of schede) {
      const nuovaScheda = new Scheda({
        id: scheda.id,
        tipologia: scheda.tipologia,
        giorniAllenamento: scheda.giorni.length,
      });
  
      nuovaScheda.setGiorni(scheda.giorni);
  
      scheda.esercizi.forEach(e => {
        const newEs = new EsercizioScheda(
          e.idUnivoco,
          e.idEsercizio?.idEsercizio || e.idEsercizio,
          e.giorno,
          e.ripetizioni,
          e.serie,
          e.tempoRecupero,
          e.carico,
          e.completato
        );
  
        nuovaScheda.addEsercizio(newEs);
      });

      if (!(lastRun === oggi)) nuovaScheda.resetCompletatoEs();

      await saveScheda(nuovaScheda);
    }

    localStorage.setItem('lastExerciseCheck', oggi);
}