import { EsercizioScheda } from './EsercizioScheda.js';

export class Giorno {
  /**
   * @param {string} nomeGiorno (es. "Lunedì")
   * @param {EsercizioScheda[]} esercizi
   */
  constructor(nomeGiorno, esercizi = []) {
    this.nomeGiorno = nomeGiorno;
    this.esercizi = esercizi;
  }

  // 🔹 Getter e Setter per nomeGiorno
  getNomeGiorno() {
    return this.nomeGiorno;
  }
  setNomeGiorno(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Il nome del giorno deve essere una stringa non vuota");
    }
    this.nomeGiorno = value;
  }

  // 🔹 Getter e Setter per esercizi
  getEsercizi() {
    return this.esercizi;
  }
  setEsercizi(value) {
    if (!Array.isArray(value) || !value.every(e => e instanceof EsercizioScheda)) {
      throw new Error("Gli esercizi devono essere un array di EsercizioScheda");
    }
    this.esercizi = value;
  }

  // 🔹 Metodo per aggiungere un singolo esercizio
  aggiungiEsercizio(esercizioScheda) {
    if (!(esercizioScheda instanceof EsercizioScheda)) {
      throw new Error("L'elemento deve essere un'istanza di EsercizioScheda");
    }
    this.esercizi.push(esercizioScheda);
  }

  // 🔹 Per serializzazione su IndexedDB
  toJSON() {
    return {
      nomeGiorno: this.nomeGiorno,
      esercizi: this.esercizi.map(e => e.toJSON ? e.toJSON() : e)
    };
  }
}