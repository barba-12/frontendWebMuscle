// EsercizioScheda.js
import { Esercizio } from './Esercizio.js';

export class EsercizioScheda {
  /**
   * @param {Esercizio} esercizio
   * @param {number} ripetizioni
   * @param {number} serie
   * @param {number} tempoRecupero (in secondi)
   * @param {number} carico (peso o carico macchina)
   */
  constructor(esercizio, ripetizioni, serie, tempoRecupero, carico) {
    this.esercizio = esercizio;
    this.ripetizioni = ripetizioni;
    this.serie = serie;
    this.tempoRecupero = tempoRecupero;
    this.carico = carico;
  }
}
