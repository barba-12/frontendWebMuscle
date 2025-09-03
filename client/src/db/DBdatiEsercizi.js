// src/db/DBdatiEsercizi.js
const DB_NAME = "AllenamentiDB";
const STORE_NAME = "datiEsercizi";
const DB_VERSION = 1;

// Funzione per aprire/creare il DB
export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // come per le schede: keyPath = "id"
        db.createObjectStore(STORE_NAME, { keyPath: "idEsercizio" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Cancella tutto
export async function clearDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.clear();

    req.onsuccess = () => {
      console.log("Tutti gli esercizi sono stati eliminati da IndexedDB.");
      resolve(true);
    };
    req.onerror = () => reject(req.error);
  });
}

// Salva o aggiorna un esercizio base
export async function saveEsercizioBase(esercizio) {
  const db = await openDB();

  // carico tutti per verificare duplicati
  const esercizi = await getAllEserciziBase();
  if (esercizi.some(e => e.idEsercizio === esercizio.idEsercizio && e.id !== esercizio.id)) {
    throw new Error(`Esercizio con idEsercizio=${esercizio.idEsercizio} già presente`);
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    // put salva se non esiste, aggiorna se esiste già (stesso id)
    const req = store.put(esercizio);

    req.onsuccess = () => {
      console.log("Esercizio salvato/aggiornato:", esercizio);
      resolve(esercizio);
    };
    req.onerror = () => reject(req.error);
  });
}

// Elimina un esercizio
export async function deleteEsercizioBase(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

// Recupera un esercizio per id
export async function getEsercizioBase(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

// Recupera un esercizio per id e omette i primi valori di ripetizioni, carico e tempoRecupero
export async function getEsercizioBaseOmettendoPrimi(id) {
  const db = await openDB();

  // 🔹 Recupera esercizio da IndexedDB
  const esDB = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);

    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });

  if (!esDB) return null;

  // Recupera esercizi dal JSON
  let eserciziFile = [];
  try {
    const basePath = import.meta.env.BASE_URL || "/";
    const username = localStorage.getItem("username");
    const response = await fetch(`${basePath}esercizi_${username}.json`);
    if (response.ok) {
      eserciziFile = await response.json();
    }
  } catch (err) {
    console.error("Errore nel fetch di esercizi.json:", err);
  }

  // 🔹 Cerca esercizio corrispondente nel JSON
  const esFile = eserciziFile.find((e) => e.idEsercizio === esDB.idEsercizio);

  // 🔹 Funzione per fare merge omettendo primo valore dell'IndexedDB
  const mergeArray = (jsonArr = [], dbArr = []) => [...(jsonArr || []), ...(dbArr?.slice(1) || [])];

  const esercizioFinale = {
    ...esDB,
    ripetizioni: mergeArray(esFile?.ripetizioni, esDB.ripetizioni),
    carico: mergeArray(esFile?.carico, esDB.carico),
    tempoRecupero: mergeArray(esFile?.tempoRecupero, esDB.tempoRecupero),
  };

  return esercizioFinale;
}

// Recupera tutti gli esercizi
export async function getAllEserciziBase() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

// Rimuove tutti i dati eccetto il primo elemento per ogni esercizio
export async function resetEserciziKeepFirst() {
  const db = await openDB();

  const esercizi = await getAllEserciziBase();

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  await Promise.all(
    esercizi.map((es) => {
      const esercizioPulito = {
        ...es,
        ripetizioni: es.ripetizioni?.length > 0 ? [es.ripetizioni[0]] : [],
        carico: es.carico?.length > 0 ? [es.carico[0]] : [],
        tempoRecupero: es.tempoRecupero?.length > 0 ? [es.tempoRecupero[0]] : [],
      };

      return new Promise((resolve, reject) => {
        const req = store.put(esercizioPulito);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    })
  );

  return true;
}

//JSON:
export async function getAllEsercizi() {
  let eserciziFile = [];
  try {
    const basePath = import.meta.env.BASE_URL || "/";
    const username = localStorage.getItem("username");
    const response = await fetch(`${basePath}esercizi_${username}.json`); // JSON in public
    if (response.ok) {
      eserciziFile = await response.json();
    }
  } catch (err) {
    console.error("Errore nel fetch di esercizi.json:", err);
  }

  const eserciziDB = await getAllEserciziBase(); // DB IndexedDB

  // Merge DB + JSON
  const eserciziFinali = eserciziDB.map((esDB) => {
    const esFile = eserciziFile.find((e) => e.idEsercizio === esDB.idEsercizio);

    const mergeArray = (jsonArr = [], dbArr = []) => [...jsonArr, ...dbArr.slice(1)];

    return {
      ...esDB,
      ripetizioni: mergeArray(esFile?.ripetizioni, esDB.ripetizioni),
      carico: mergeArray(esFile?.carico, esDB.carico),
      tempoRecupero: mergeArray(esFile?.tempoRecupero, esDB.tempoRecupero),
    };
  });

  return eserciziFinali;
}