function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("EserciziDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Creo uno store se non esiste
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getIncrementalId() {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("settings", "readwrite");
    const store = tx.objectStore("settings");

    const getRequest = store.get("lastId");

    getRequest.onsuccess = () => {
      let lastId = getRequest.result ? getRequest.result.value : 0;
      let newId = lastId + 1;

      store.put({ key: "lastId", value: newId });

      resolve(newId);
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
}