export async function clearAllIndexedDB() {
  return new Promise((resolve, reject) => {
    // Recupera tutti i database
    if (!indexedDB.databases) {
      console.warn("Il browser non supporta indexedDB.databases(), cancella manualmente i DB da DevTools.");
      resolve();
      return;
    }

    indexedDB.databases().then((dbs) => {
      const deletePromises = dbs.map((dbInfo) => {
        console.log("Eliminando DB:", dbInfo.name);
        return new Promise((res, rej) => {
          const request = indexedDB.deleteDatabase(dbInfo.name);
          request.onsuccess = () => res();
          request.onerror = () => rej(request.error);
          request.onblocked = () => console.warn("Eliminazione bloccata:", dbInfo.name);
        });
      });

      Promise.all(deletePromises)
        .then(() => {
          console.log("Tutti i DB eliminati con successo.");
          resolve();
        })
        .catch((err) => {
          console.error("Errore durante la cancellazione dei DB:", err);
          reject(err);
        });
    });
  });
}
