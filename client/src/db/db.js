const DB_NAME = "exerciseDB";
const STORE_NAME = "esercizi";
const DB_VERSION = 1;

// 🔹 Funzione per aprire/creare il DB
export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 🔹 Salva o aggiorna tutti gli esercizi
export async function saveEsercizi(esercizi) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ key: "all", value: esercizi });

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

// Cancella completamente tutte le schede dal DB
export async function clearDBExercise() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const clearRequest = store.clear();

    clearRequest.onerror = () => {
      console.error("Errore durante la cancellazione delle schede da IndexedDB.");
      reject(clearRequest.error);
    };
  });
}

// 🔹 Recupera tutti gli esercizi
export async function getEsercizi() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get("all");

    req.onsuccess = () => resolve(req.result?.value || null);
    req.onerror = () => reject(req.error);
  });
}

// 🔹 Salva o aggiorna i filtri
export async function saveFiltri(filtri) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ key: "filtri", value: filtri });

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

// 🔹 Recupera i filtri
export async function getFiltri() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get("filtri");

    req.onsuccess = () => resolve(req.result?.value || { muscle: [], type: [] });
    req.onerror = () => reject(req.error);
  });
}