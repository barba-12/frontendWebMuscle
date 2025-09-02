// src/db/indexedDB.js
const DB_NAME = "AllenamentiDB";
const STORE_NAME = "datiEsercizi";
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

// Cancella completamente tutte le schede dal DB
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

// Aggiungi un nuovo esercizio base
export async function addEsercizioBase(esercizio) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const request = store.add(esercizio);

    request.onsuccess = () => {
      console.log("Esercizio aggiunto:", esercizio);
      resolve(esercizio);
    };

    request.onerror = () => {
      console.error("Errore nell'aggiunta esercizio:", request.error);
      reject(request.error);
    };
  });
}

// Recupera un esercizio base tramite ID
export async function getEsercizioBase(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const request = store.get(id);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

// Modifica/aggiorna i dati di un esercizio esistente
export async function updateEsercizioBase(esercizio) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const request = store.put(esercizio); // se esiste lo aggiorna, se no lo crea

    request.onsuccess = () => {
      console.log("Esercizio aggiornato:", esercizio);
      resolve(esercizio);
    };

    request.onerror = () => {
      console.error("Errore nell'aggiornamento esercizio:", request.error);
      reject(request.error);
    };
  });
}

// Recupera tutti gli esercizi salvati
export async function getAllEserciziBase() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}