// EsercizioScheda.js

export class EsercizioScheda {
  /**
   * @param {number} idEsercizio - id dell'esercizio base (riferimento a Esercizio)
   * @param {number} ripetizioni
   * @param {number} serie
   * @param {number} tempoRecupero
   * @param {number} carico
   */
  constructor(idEsercizio, ripetizioni, serie, tempoRecupero, carico) {
    this.idEsercizio = idEsercizio;   // 🔹 solo l’id, non l’intero oggetto Esercizio
    this.ripetizioni = ripetizioni;
    this.serie = serie;
    this.tempoRecupero = tempoRecupero;
    this.carico = carico;
  }
}