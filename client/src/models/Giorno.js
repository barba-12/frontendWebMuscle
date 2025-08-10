// Giorno.js
import { EsercizioScheda } from './EsercizioScheda.js';

export class Giorno {
  /**
   * @param {string} nomeGiorno (es. "Lunedì")
   * @param {EsercizioScheda[]} esercizi
   */
  constructor(nomeGiorno, esercizi = []) {
    this.nomeGiorno = nomeGiorno;
    this.esercizi = esercizi; // array di EsercizioScheda
  }

  aggiungiEsercizio(esercizioScheda) {
    this.esercizi.push(esercizioScheda);
  }
}